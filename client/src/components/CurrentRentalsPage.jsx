import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { Container, Row } from 'react-bootstrap';
import RentedCarsTable from './rentedCarsTable/RentedCarsTable';
import { API_ROOT } from '../constants/constants';
import { setRentals } from '../actions/setRentalsAction';
import { setCars } from '../actions/setCarsAction';
import * as calucalte from '../utils/calculate-rent';
import Section from './shared/section/Section';
import { warningLevel } from '../constants/warning-levels';
import { rentalTypes } from '../common/models/prop-types';
import LoadingIdicator from './shared/loadingIndicator/LoadingIdicator';
import NotFound from './shared/notFound/NotFound';

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
      setRentals(rentals.data.reverse());
    } catch (error) {
      toastr.error('Failed getting rentals', 'Error occurred while getting rentals!');
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
      toastr.error('Failed getting cars', 'Error occurred while getting cars!');
    }
    dispatchSetCars(cars.data);
  }

  async returnCar(ev, id) {
    try {
      await axios.put(`${API_ROOT}/rentals/${id}`);
      toastr.success('Car returned', 'Car was succesfully returned!');
      await this.getCurrentRentals();
      await this.getCars();
    } catch (error) {
      toastr.error('Car return error', 'Error occurred while returning car!');
    }
  }

  render() {
    const { loadingRentals } = this.state;
    const { rentals } = this.props;

    const openRentals = rentals.filter((rental) => rental.status === 'open');

    const transformedRentals = openRentals.map((rental) => {
      const transformed = JSON.parse(JSON.stringify(rental));
      const rentedDate = new Date(rental.dateFrom);
      const estimatedDate = new Date(rental.estimatedDate);
      const today = new Date();
      const pricePerDay = transformed.car.price;
      const { age } = transformed;
      transformed.warning = warningLevel.noWorry;

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

        if (penaltyDays > 2) {
          transformed.warning = warningLevel.notGood;
        } else {
          transformed.warning = warningLevel.penalty;
        }
      }

      const warningDays = calucalte.days(today, estimatedDate);
      if (warningDays === 2 || warningDays === 1) {
        transformed.warning = warningLevel.soon;
      }

      // Client total price
      transformed.curTotalPrice = calucalte.totalPrice(transformed.curPricePerDay, transformed.curDaysRented) + penalty;

      return transformed;
    });

    const table = openRentals.length
      ? <RentedCarsTable rentals={transformedRentals} returnCar={this.returnCar} />
      : <NotFound text="No rented cars" />;

    return (
      <Container className="current-rentals">
        <Row>
          <Section header="Current rentals">
            {loadingRentals
              ? <LoadingIdicator center />
              : table}
          </Section>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  rentals: state.rentals,
});

export default connect(mapStateToProps, { setRentals, setCars })(CurrentRentals);

CurrentRentals.propTypes = {
  rentals: PropTypes.arrayOf(PropTypes.shape(rentalTypes)).isRequired,
  setRentals: PropTypes.func.isRequired,
};
