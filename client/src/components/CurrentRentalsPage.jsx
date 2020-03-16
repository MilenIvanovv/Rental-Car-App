import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import RentedCarsTable from './rentedCarsTable/RentedCarsTable';
import { API_ROOT } from '../constants/constants';
import { setRentals } from '../actions/setRentalsAction';
import { setCars } from '../actions/setCarsAction';
import * as calucalte from '../utils/calculate-rent';
import { toastr } from 'react-redux-toastr';

class CurrentRentals extends Component {
  constructor(props) {
    super(props);

    this.returnCar = this.returnCar.bind(this);

    this.state = {
      loadingRentals: false
    }
  }

  async componentDidMount() {
    const { rentals } = this.props;

    if (!rentals.length) {
      await this.getCurrentRentals();
    }
  }

  async returnCar(ev, id) {
    await new Promise((res) => setTimeout(res, 1000));
    try {
      await axios.put(`${API_ROOT}/rentals/${id}`);
    } catch (error) {
      toastr.error('Car return error', 'Error occurred while returning car!');
    }
    toastr.success('Car returned', 'Car was succesfully returned!');
    await this.getCurrentRentals();
    await this.getCars();
  }

  async getCurrentRentals() {
    this.setState({ loadingRentals: true });
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
    this.setState({ loadingRentals: false });
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
    if (this.state.loadingRentals) {
      return <h1>Loading...</h1>
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

export default connect(mapStateToProps, { setRentals, setCars })(CurrentRentals);

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
