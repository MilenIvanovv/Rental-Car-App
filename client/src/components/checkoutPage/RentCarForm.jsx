import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_ROOT } from '../../constants/constants';

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
  }

  handleReturnDateChange(ev) {
    this.setState({
      returnDate: ev.target.value,
    });
  }

  async confirmHanlder() {
    const { car } = this.props;

    const client = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
    };

    console.log(this.state.returnDate);
    const result = await axios.post(`${API_ROOT}/rentals`, {
      estimatedDate: new Date(this.state.returnDate),
      client,
      carId: car.id,
    });
  }

  render() {
    const {
      firstName,
      lastName,
      age,
      returnDate,
    } = this.state;

    const { estimations, car } = this.props;

    return (
      // eslint-disable-next-line react/jsx-fragments
      <Fragment>
        <div className="col-4">
          <h4>Car</h4>
          <CarCard car={car} />
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
              <input type="date" min={new Date().toISOString().split("T")[0]} className="form-control" value={returnDate} onChange={this.handleReturnDateChange} />
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
                <span>{estimations.days}</span>
                <br />
                Price per day
                {' '}
                <span>{estimations.pricePerDay}</span>
                <br />
                Total
                {' '}
                <span>{estimations.totalPrice}</span>
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
//   submitForm: PropTypes.bool,
//   onSubmit: PropTypes.func.isRequired,
//   estimations: PropTypes.shape({
//     days: PropTypes.number.isRequired,
//     pricePerDay: PropTypes.number.isRequired,
//     totalPrice: PropTypes.number.isRequired,
//   }).isRequired,
// };

// RentCarForm.defaultProps = {
//   submitForm: false,
// };
