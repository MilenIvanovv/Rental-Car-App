import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import RentedCarsTable from './rentedCarsTable/rentedCarsTable/RentedCarsTable';
import { API_ROOT } from '../constants/constants';
import { setRentals } from '../actions/setRentalsAction';
import { setCars } from '../actions/setCarsAction';
import * as calucalte from '../utils/calculate-rent';

class CurrentRentals extends Component {
  constructor(props) {
    super(props);

    this.returnCar = this.returnCar.bind(this);

    this.state = {
      loadingRentals: false,
    };
  }

  async componentDidMount() {
    const { rentals } = this.props;

    if (!rentals.length) {
      await this.getCurrentRentals();
    }
  }

  async getCurrentRentals() {
    this.setState({ loadingRentals: true });
    // eslint-disable-next-line no-shadow
    const { setRentals } = this.props;
    try {
      const rentals = await axios.get(`${API_ROOT}/rentals`);
      setRentals(rentals.data);
    } catch (error) {
      console.log(error);
    }
    this.setState({ loadingRentals: false });
  }

  async getCars() {
    // eslint-disable-next-line react/prop-types
    const { setCars: dispatchSetCars } = this.props;

    let cars;
    try {
      cars = await axios.get(`${API_ROOT}/cars`);
    } catch (error) {
      console.log(error);
    }
    dispatchSetCars(cars.data);
  }

  async returnCar(ev, id) {
    try {
      await axios.put(`${API_ROOT}/rentals/${id}`);
    } catch (error) {
      toastr.error('Car return error', 'Error occurred while returning car!');
    }
    toastr.success('Car returned', 'Car was succesfully returned!');
    await this.getCurrentRentals();
    await this.getCars();
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.loadingRentals) {
      return <h1>Loading...</h1>;
    }

    const { rentals } = this.props;

    const openRentals = rentals.filter((rental) => rental.status === 'open');

    if (!openRentals.length) {
      return <h1>Contracts not found</h1>
    }

    const transformedRentals = openRentals.map((rental) => {
      const transformed = JSON.parse(JSON.stringify(rental));
      const rentedDate = new Date(rental.dateFrom);
      const estimatedDate = new Date(rental.estimatedDate);
      const today = new Date();
      const pricePerDay = transformed.car.price;
      const { age } = transformed;

      // Client estimation prices
      transformed.estimatedDays = calucalte.days(rentedDate, estimatedDate);
      transformed.estimatedPricePerDay = calucalte.applyAllToPrice(pricePerDay, transformed.estimatedDays, age);

      // Client real current prices
      transformed.curDaysRented = calucalte.days(rentedDate, today);
      transformed.curPricePerDay = calucalte.applyAllToPrice(pricePerDay, transformed.curDaysRented, age);

      // Add penalty
      const penaltyDays = calucalte.days(estimatedDate, today);
      
      let penalty = 0;
      if (penaltyDays > 0) {
        const penaltyResult = calucalte.penalty(pricePerDay, penaltyDays);

        // if penalty days is 7 and price per day is 100 => price per day penalty will be 100% => 100
        transformed.curPricePerDay += penaltyResult.pricePerDayPenalty;

        // if penalty days is 7 and price per day is 100 => total penalty = 7 * pricePerDayPenalty(100); 
        penalty = penaltyResult.totalPenalty;

        transformed.hasPenalty = true;
      }
      
      // Client total price
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

export default connect(mapStateToProps, { setRentals, setCars })(CurrentRentals);

CurrentRentals.propTypes = {
  rentals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    car: PropTypes.shape({
      id: PropTypes.number.isRequired,
      model: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
    client: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    }).isRequired,
    returnDate: PropTypes.string,
    dateFrom: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['open', 'returned']).isRequired,
    hasPenalty: PropTypes.bool,
  })).isRequired,

  setRentals: PropTypes.func.isRequired,
};
