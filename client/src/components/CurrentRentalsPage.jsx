import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import RentedCarsTable from './rentedCarsTable/RentedCarsTable';
import { API_ROOT } from '../constants/constants';
import { setRentals } from '../actions/setRentalsAction';
import * as calucalte from '../utils/calculate-rent';

class CurrentRentals extends Component {
  constructor(props) {
    super(props);

    this.returnCar = this.returnCar.bind(this);
  }

  async componentDidMount() {
    await this.getCurrentRentals();
  }

  async returnCar(ev, id) {
    this.setState({ isDisabled: true });
    await new Promise((res) => setTimeout(res, 1000));
    await axios.put(`${API_ROOT}/rentals/${id}`);
    await this.getCurrentRentals();
  }

  async getCurrentRentals() {
    await new Promise((res, rej) => {
      setTimeout(res, 1000);
    })
    // eslint-disable-next-line no-shadow
    const { setRentals } = this.props;
    const rentals = await axios.get(`${API_ROOT}/rentals`);

    setRentals(rentals.data);
  }

  render() {
    const { rentals } = this.props;

    const openRentals = rentals.filter((rental) => rental.status === 'open');

    const transformedRentals = openRentals.map((rental) => {
      const transformed = JSON.parse(JSON.stringify(rental));
      const rentedDate = new Date(rental.dateFrom);
      const estimatedDate = new Date(rental.estimatedDate);
      const today = new Date();
      const pricePerDay = transformed.car.class.price;
      const { age } = transformed;

      // Client estimation prices
      transformed.estimatedDays = calucalte.days(rentedDate, estimatedDate);
      transformed.estimatedPricePerDay = calucalte.applyAllToPrice(pricePerDay, transformed.estimatedDays, age);

      // Client real current prices
      const penaltyDays = calucalte.days(estimatedDate, today);
      transformed.curDaysRented = calucalte.days(rentedDate, today);
      transformed.curPricePerDay = calucalte.applyAllToPrice(pricePerDay, transformed.curDaysRented, age);

      let penalty = 0;
      if (penaltyDays > 0) {
        penalty = calucalte.penalty(pricePerDay, penaltyDays);
        transformed.hasPenalty = true;
      }

      transformed.curTotalPrice = calucalte.totalPrice(transformed.curPricePerDay, transformed.curDaysRented) + penalty;

      return transformed;
    });

    return (
      <div>
        <div className="p-3">
          <h3>Current rentals</h3>
          <RentedCarsTable rentals={transformedRentals} returnCar={this.returnCar} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rentals: state.rentals,
});

export default connect(mapStateToProps, { setRentals })(CurrentRentals);

CurrentRentals.propTypes = {
  rentals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    car: PropTypes.shape({
      id: PropTypes.number.isRequired,
      model: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    returnDate: PropTypes.string,
    dateFrom: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['open', 'returned']).isRequired,
    hasPenalty: PropTypes.bool,
  })).isRequired,

  setRentals: PropTypes.func.isRequired,
};
