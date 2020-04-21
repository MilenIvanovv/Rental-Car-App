import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { API_ROOT } from '../../../constants/constants';
import * as calculate from '../../../utils/calculate-rent';
import { setRentals } from '../../../actions/setRentalsAction';
import { setCars } from '../../../actions/setCarsAction';
import setRentalCarForm from '../../../actions/setRentCarFormActions';
import { carTypes } from '../../../common/models/prop-types';

import './estimations.css';
import '../checkoutPage.css';

export class Estimations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estimations: {},
      isDisabled: false,
      redirect: null,
    };

    this.confirmHanlder = this.confirmHanlder.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { rentCarForm } = this.props;

    if (JSON.stringify(prevProps.rentCarForm) !== JSON.stringify(rentCarForm)
      && (rentCarForm.age.value !== '' && rentCarForm.returnDate.value !== null)) {
      this.estimatePrices();
    }
  }

  async getCurrentRentals() {
    // eslint-disable-next-line no-shadow
    const { setRentals } = this.props;
    try {
      const rentals = await axios.get(`${API_ROOT}/rentals`);
      setRentals(rentals.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getCars() {
    const { setCars: dispatchSetCars } = this.props;

    let cars;
    try {
      cars = await axios.get(`${API_ROOT}/cars`);
    } catch (error) {
      console.log(error);
    }
    dispatchSetCars(cars.data);
  }

  validateForm() {
    const { rentCarForm, modifyForm } = this.props;
    const tempForm = JSON.parse(JSON.stringify(rentCarForm));
    let isValid = true;
    Object.values(tempForm).forEach((field) => {
      if (field.error === 'not touched') {
        // eslint-disable-next-line no-param-reassign
        field.error = 'cannot be empty!';
        isValid = false;
      }
    });

    tempForm.isFormValid = isValid;
    modifyForm(tempForm);
    return isValid;
  }

  estimatePrices() {
    const { car, rentCarForm } = this.props;
    const age = rentCarForm.age.value;
    const returnDate = rentCarForm.returnDate.value;

    if (car && (age.value === '' || returnDate === '')) {
      return;
    }

    const days = calculate.days(new Date(), new Date(returnDate));
    const pricePerDay = calculate.applyAllToPrice(car.price, days, age);
    const totalPrice = calculate.totalPrice(pricePerDay, days);

    this.setState({
      estimations: {
        days,
        pricePerDay,
        totalPrice,
      },
    });
  }

  async confirmHanlder() {
    if (!this.validateForm()) {
      return;
    }

    const { car, rentCarForm, resetForm } = this.props;

    const {
      firstName, lastName, age, returnDate,
    } = rentCarForm;

    const client = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: +age.value,
    };

    try {
      this.setState({ isDisabled: true });
      await axios.post(`${API_ROOT}/rentals`, {
        estimatedDate: new Date(returnDate.value),
        client,
        carId: car.id,
      });
      await this.getCurrentRentals();
      await this.getCars();
      resetForm();
      this.setState({ redirect: '/current-rentals' });
      toastr.success('Car rented', 'You successfully rented a car!');
    } catch (error) {
      toastr.error('Car renting failed', 'Error occureed while renting a car!');
      console.log(error);
    }
    this.setState({ isDisabled: false });
  }

  render() {
    const {
      estimations,
      isDisabled,
      redirect,
    } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <div className="estimations card">
        <div className="card-body align-card-text">
          <div className="card-text">
            <p className="w-50">
              <span>Days</span>
              <span>Price per day</span>
              <span>Total</span>
            </p>
            <p>
              <span>{estimations.days || 0}</span>
              <span>{`$${estimations.pricePerDay || 0}`}</span>
              <span>{`$${estimations.totalPrice || 0}`}</span>
            </p>
          </div>
          <div className="buttons-container">
            <button data="confirm" type="button" className="btn btn-primary" disabled={isDisabled} onClick={this.confirmHanlder}>
              Confirm
            </button>
            <Link to="/cars">
              <button type="button" className="btn btn-secondary">
                Cencel
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Estimations.propTypes = {
  rentCarForm: PropTypes.shape({
    firstName: PropTypes.shape({
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    lastName: PropTypes.shape({
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    age: PropTypes.shape({
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    returnDate: PropTypes.shape({
      value: PropTypes.string,
      error: PropTypes.string.isRequired,
    }),
    isFormValid: PropTypes.bool.isRequired,
  }).isRequired,
  car: PropTypes.shape(carTypes),
  setRentals: PropTypes.func.isRequired,
  setCars: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  modifyForm: PropTypes.func.isRequired,
};

Estimations.defaultProps = {
  car: null,
};

const mapStateToProps = (state) => ({
  rentCarForm: state.form,
});

const mapActionsToProps = {
  setRentals,
  setCars,
  resetForm: setRentalCarForm.resetForm,
  modifyForm: setRentalCarForm.modifyForm,
};

export default connect(mapStateToProps, mapActionsToProps)(Estimations);
