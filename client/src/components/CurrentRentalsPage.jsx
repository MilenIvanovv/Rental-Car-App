import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import RentedCarsTable from './rentedCarsTable/RentedCarsTable';
import { API_ROOT } from '../constants/constants';
import { setRentals } from '../actions/setRentalsAction';
import * as calucalte from '../utils/calculate-rent';

class CurrentRentals extends Component {
  async componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { setRentals } = this.props;
    const rentals = await axios.get(`${API_ROOT}/rentals`);

    setRentals(rentals.data);
  }

  render() {
    const { rentals } = this.props;

    const transformedRentals = rentals.map((rental) => {
      const transformed = JSON.parse(JSON.stringify(rental));
      const rentedDate = new Date(rental.dateFrom);
      const estimatedDate = new Date(rental.estimatedDate);
      const pricePerDay = transformed.car.class.price;
      const { age } = transformed;

      // Client estimation prices
      transformed.estimatedDays = calucalte.days(rentedDate, estimatedDate);
      transformed.estimatedPricePerDay = calucalte.applyAllToPrice(pricePerDay, transformed.estimatedDays, age);

      // Client real current prices
      transformed.curDaysRented = calucalte.days(rentedDate, new Date());
      transformed.curPricePerDay = calucalte.applyAllToPrice(pricePerDay, transformed.curDaysRented, age);

      transformed.curTotalPrice = calucalte.totalPrice(transformed.curPricePerDay, transformed.curDaysRented);

      return transformed;
    });

    return (
      <div>
        <div className="p-3">
          <h3>Current rentals</h3>
          <RentedCarsTable rentals={transformedRentals} />
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
    returnDate: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['open', 'closed']).isRequired,
  })).isRequired,

  setRentals: PropTypes.func.isRequired,
};
