import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_ROOT } from '../../constants/constants';
import * as calculate from '../../utils/calculate-rent';

import './checkoutPage.css';
import CarCard from '../shared/carCard/CarCard';

export default class RentCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      returnDate: '',
      errors: {},
      formIsValid: true,
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
    this.setState({
      returnDate: ev.target.value,
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
      await axios.post(`${API_ROOT}/rentals`, {
        estimatedDate: new Date(returnDate),
        client,
        carId: car.id,
      });
    } catch (error) {
      console.log(error);
    }
    this.setState({ redirect: '/current-rentals' });
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
              <input type="text" className={!formIsValid && errors.firstName ? 'form-control is-invalid' : 'form-control'} value={firstName} onChange={this.handleFirstNameChange} />
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
              <input type="text" className={!formIsValid && errors.lastName ? 'form-control is-invalid' : 'form-control'} value={lastName} onChange={this.handleLasttNameChange} />
              {errors.lastName && (
                <small id="emailHelp" className="form-text text-muted">
                  Last name
                  {errors.lastName}
                </small>
              )}
            </div>
            <div className="form-group">
              <div>Age</div>
              <input type="number" min="18" className={!formIsValid && errors.age ? 'form-control is-invalid' : 'form-control'} value={age} onChange={this.handleAgeChange} />
            </div>
            <div className="form-group">
              <div>Return date</div>
              <input type="datetime-local" min={new Date().toISOString().slice(0, 16)} className={!formIsValid && errors.returnDate ? 'form-control is-invalid' : 'form-control'} value={returnDate} onChange={this.handleReturnDateChange} />
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
                <button type="button" className="btn btn-primary" disabled={!formIsValid} onClick={this.confirmHanlder}>
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
  car: {
    id: 0,
    model: '',
    class: {
      id: 0,
      name: '',
      price: 0,
    },
    picture: '',
    status: '',
  },
};
