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

import './checkoutPage.css';
import CarCard from '../shared/carCard/CarCard';
import moment from 'moment';

class RentCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      returnDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
      errors: {},
      formIsValid: true,
      isDisabled: false,
      estimations: {},
      redirect: null,
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLasttNameChange = this.handleLasttNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleReturnDateChange = this.handleReturnDateChange.bind(this);
    this.confirmHanlder = this.confirmHanlder.bind(this);
  }


  handleFirstNameChange(ev) {
    this.setState({
      firstName: ev.target.value,
    }, this.handleValidation);
  }

  handleLasttNameChange(ev) {
    this.setState({
      lastName: ev.target.value,
    }, this.handleValidation);
  }

  handleAgeChange(ev) {
    this.setState({
      age: ev.target.value,
    }, () => {
      this.estimatePrices();
      this.handleValidation();
    });
  }

  handleReturnDateChange(ev) {
    console.log('ev.target.value: ', ev.target.value);
    this.setState({
      returnDate: ev.target.value
    }, () => {
      this.estimatePrices();
      this.handleValidation();
    });
  }

  handleValidation() {
    const {
      firstName, lastName, age, returnDate,
    } = this.state;
    const errors = {};
    console.log('returnDate: ', returnDate);

    let formIsValid = true;

    if (firstName === '') {
      formIsValid = false;
      errors.firstName = 'Cannot be empty';
    }

    if (lastName === '') {
      formIsValid = false;
      errors.lastName = 'Cannot be empty';
    }

    if (age === '') {
      formIsValid = false;
      errors.age = 'Cannot be empty';
    }

    if (returnDate === '') {
      formIsValid = false;
      errors.returnDate = 'Cannot be empty';
    }

    this.setState({ errors, formIsValid });
  }

  estimatePrices() {
    const { age, returnDate } = this.state;

    if (age === '' || returnDate === '') {
      return;
    }

    const { car } = this.props;

    const days = calculate.days(new Date(), new Date(returnDate));
    const pricePerDay = calculate.applyAllToPrice(car.class.price, days, age);
    const totalPrice = calculate.totalPrice(pricePerDay, days);
    console.log('returnDate: ', returnDate);

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
    } = this.state;

    const client = {
      firstName, lastName, age,
    };

    try {
      this.setState({ isDisabled: true })
      await new Promise((res) => setTimeout(res, 1000));
      await axios.post(`${API_ROOT}/rentals`, {
        estimatedDate: new Date(returnDate),
        client,
        carId: car.id,
      });
      await this.getCurrentRentals();
      await this.getCars();
      this.setState({
        redirect: '/current-rentals',
        isDisabled: false,
      });
      toastr.success('Car rented', 'You successfully rented a car!');
    } catch (error) {
      toastr.error('Car renting failed', 'Error occureed while renting a car!');
      console.log(error);
    }
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
      firstName,
      lastName,
      age,
      returnDate,
      redirect,
      estimations,
      formIsValid,
      isDisabled,
      errors,
    } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const { car } = this.props;

    return (
      // eslint-disable-next-line react/jsx-fragments
      <Fragment>
        <div className="col-4">
          <h4>Car</h4>
          <CarCard car={car} noButton />
        </div>
        <div className="col-4">
          <h4>Booking</h4>
          <form>
            <div className="form-group">
              <div>First name</div>
              <input
                type="text"
                data="firstName"
                className={!formIsValid && errors.firstName ? 'form-control is-invalid' : 'form-control'}
                value={firstName}
                onChange={this.handleFirstNameChange}
              />
              <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>

              {errors.firstName && (
                <small id="emailHelp" className="form-text text-muted">
                  First name
                  {errors.firstName}
                </small>
              )}
            </div>
            <div className="form-group">
              <div>Last name</div>
              <input
                type="text"
                data="lastName"
                className={!formIsValid && errors.lastName ? 'form-control is-invalid' : 'form-control'}
                value={lastName}
                onChange={this.handleLasttNameChange}
              />
              {errors.lastName && (
                <small id="emailHelp" className="form-text text-muted">
                  Last name
                  {errors.lastName}
                </small>
              )}
            </div>
            <div className="form-group">
              <div>Age</div>
              <input
                type="number"
                min="18"
                data="age"
                className={!formIsValid && errors.age ? 'form-control is-invalid' : 'form-control'}
                value={age}
                onChange={this.handleAgeChange}
              />
            </div>
            <div className="form-group">
              <div>Return date</div>
              <input
                type="datetime-local"
                // min={new Date().toISOString().split(0, 16)}
                data="date"
                className={!formIsValid && errors.returnDate ? 'form-control is-invalid' : 'form-control'}
                value={returnDate}
                onChange={this.handleReturnDateChange}
              />
            </div>
          </form>
        </div>
        <div className="col-4">
          <h4>Estimated Price</h4>
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
                  <span>
                    {estimations.pricePerDay || 0}
                    {' $'}
                  </span>
                  <span>
                    {estimations.totalPrice || 0}
                    {' $'}
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-around">
                <button data="confirm" type="button" className="btn btn-primary" disabled={!formIsValid || isDisabled} onClick={this.confirmHanlder}>
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
        </div>
      </Fragment>
    );
  }
}

RentCarForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
    picture: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

RentCarForm.defaultProps = {
  car: null,
};

const mapStateToProps = (state) => ({
  rentals: state.rentals,
});

export default connect(mapStateToProps, { setRentals, setCars })(RentCarForm);
