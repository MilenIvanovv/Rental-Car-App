import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_ROOT } from '../../constants/constants';
import * as calculate from '../../utils/calculate-rent';
import { toastr } from 'react-redux-toastr';
import { setRentals } from '../../actions/setRentalsAction';
import { setCars } from '../../actions/setCarsAction';
import setRentalCarForm from '../../actions/setRentCarFormActions';

import './checkoutPage.css';

export class Estimations extends Component {

  constructor(props) {
    super(props)

    this.state = {
      estimations: {},
      errors: {},
      isDisabled: false,
      redirect: null,
    }

    this.confirmHanlder = this.confirmHanlder.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.rentCarForm) !== JSON.stringify(this.props.rentCarForm)) {
      this.estimatePrices();
    }
  }

  estimatePrices() {
    const age = this.props.rentCarForm.age.value;
    const returnDate = this.props.rentCarForm.returnDate.value;
    const { car } = this.props;

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
    const { car } = this.props;

    const {
      firstName, lastName, age, returnDate,
    } = this.props.rentCarForm;

    const client = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
    };

    try {
      this.setState({ isDisabled: true })
      await new Promise((res) => setTimeout(res, 1000));
      await axios.post(`${API_ROOT}/rentals`, {
        estimatedDate: new Date(returnDate.value),
        client,
        carId: car.id,
      });
      await this.getCurrentRentals();
      await this.getCars();
      this.props.resetForm();
      this.setState({ redirect: '/current-rentals' });
      toastr.success('Car rented', 'You successfully rented a car!');
    } catch (error) {
      toastr.error('Car renting failed', 'Error occureed while renting a car!');
      console.log(error);
    }
    this.setState({ isDisabled: false })
  }

  async getCurrentRentals() {
    await new Promise((res, rej) => {
      setTimeout(res, 1000);
    })
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
    await new Promise((res) => setTimeout(res, 1000));
    try {
      cars = await axios.get(`${API_ROOT}/cars`);
    } catch (error) {
      console.log(error);
    }
    dispatchSetCars(cars.data);
  }

  render() {

    const {
      estimations,
      isDisabled,
      redirect
    } = this.state;

    const {
      isFormValid
    } = this.props;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body align-card-text">
          <div className="card-text">
            <p className="w-50">
              <span>Days</span>
              <span>Price per day</span>
              <span>Total</span>
            </p>
            <p>
              <span>{estimations.days || 0}</span>
              <span>{`${estimations.pricePerDay || 0} $`}</span>
              <span>{`${estimations.totalPrice || 0} $`}</span>
            </p>
          </div>
          <div className="d-flex justify-content-around">
            <button data="confirm" type="button" className="btn btn-primary" disabled={!isFormValid || isDisabled} onClick={this.confirmHanlder}>
              Confirm
            </button>
            <Link to="/cars">
              <button type="button" className="btn btn-primary">
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
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    isFormValid: PropTypes.bool.isRequired,
  }),
  isFormValid: PropTypes.bool.isRequired,
};

Estimations.defaultProps = {
  car: null,
};

const mapStateToProps = (state) => ({
  rentCarForm: state.form,
  isFormValid: state.form.isFormValid,
});

const mapActionsToProps = {
  setRentals,
  setCars,
  resetForm: setRentalCarForm.resetForm
}

export default connect(mapStateToProps, mapActionsToProps)(Estimations);
