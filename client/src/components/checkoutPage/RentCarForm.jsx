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
    });
  }

  handleLasttNameChange(ev) {
    this.setState({
      lastName: ev.target.value,
    });
  }

  handleAgeChange(ev) {
    this.setState({
      age: ev.target.value,
    });

    this.estimatePrices();
  }

  handleReturnDateChange(ev) {
    this.setState({
      returnDate: ev.target.value,
    });
    
    this.estimatePrices();
  }

  estimatePrices() {
    const { age, returnDate } = this.state;

    if (age === '' || returnDate === '') {
      return;
    }

    const { car } = this.props;

    const days = calculate.days(new Date(), new Date(this.state.returnDate));
    const pricePerDay = calculate.applyAllToPrice(car.class.price, days, this.state.age);
    const totalPrice = calculate.totalPrice(pricePerDay, days);

    this.setState({
      estimations: {
        days,
        pricePerDay,
        totalPrice
      }
    });
  }

  async confirmHanlder() {
    const { car } = this.props;

    const client = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
    };

    try {
      await axios.post(`${API_ROOT}/rentals`, {
        estimatedDate: new Date(this.state.returnDate),
        client,
        carId: car.id,
      });
    } catch (error) {
      
    }
    this.setState({ redirect: '/current-rentals'});
  }

  render() {

    const {
      firstName,
      lastName,
      age,
      returnDate,
      redirect,
    } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />
    }

    const { car } = this.props;

    return (
      // eslint-disable-next-line react/jsx-fragments
      <Fragment>
        <div className="col-4">
          <h4>Car</h4>
          <CarCard car={car} noButton={true}/>
        </div>
        <div className="col-4">
          <h4>Booking</h4>
          <form>
            <div className="form-group">
              <div>First name</div>
              <input type="email" className="form-control" value={firstName} onChange={this.handleFirstNameChange} />
              <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <div>Last name</div>
              <input type="text" className="form-control" value={lastName} onChange={this.handleLasttNameChange} />
            </div>
            <div className="form-group">
              <div>Age</div>
              <input type="number" min="18" className="form-control" value={age} onChange={this.handleAgeChange} />
            </div>
            <div className="form-group">
              <div>Return date</div>
              <input type="datetime-local" min={new Date().toISOString().slice(0, 16)} className="form-control" value={returnDate} onChange={this.handleReturnDateChange} />
            </div>
          </form>
        </div>
        <div className="col-4">
          <h4>Estimated Price</h4>
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <p className="card-text">
                Days
                {' '}
                <span>{this.state.estimations.days || 0}</span>
                <br />
                Price per day
                {' '}
                <span>{this.state.estimations.pricePerDay || 0} $</span>
                <br />
                Total
                {' '}
                <span>{this.state.estimations.totalPrice || 0} $</span>
                <br />
              </p>
              <button type="button" className="btn btn-primary" onClick={this.confirmHanlder}>
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
      </Fragment>
    );
  }
}

// RentCarForm.propTypes = {
//   estimations: PropTypes.shape({
//     days: PropTypes.number.isRequired,
//     pricePerDay: PropTypes.number.isRequired,
//     totalPrice: PropTypes.number.isRequired,
//   }).isRequired,
// };