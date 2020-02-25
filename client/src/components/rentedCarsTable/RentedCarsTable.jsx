import React from 'react';
import PropTypes from 'prop-types';
import RentedCarsRow from './RentedCarsRow';
import './RentedCarsTable.css';


export default function RentedCarsTable(props) {
  const { rentals } = props;
  const elements = rentals
    .map((rental) => <RentedCarsRow key={rental.car.model} rental={rental} />);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Car</th>
          <th>Customer</th>
          <th>From</th>
          <th>Estimated Return date</th>
          <th>Estimated days rented</th>
          <th>Estimated price per day</th>
          <th>Current days rented</th>
          <th>Current price per day</th>
          <th>Current total price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {elements}
      </tbody>
    </table>
  );
}

RentedCarsTable.propTypes = {
  rentals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    car: PropTypes.shape({
      id: PropTypes.number.isRequired,
      model: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }),
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    dateFrom: PropTypes.string.isRequired,
    estimatedDate: PropTypes.string.isRequired,


    estimatedDays: PropTypes.number.isRequired,
    estimatedPricePerDay: PropTypes.number.isRequired,
    curDaysRented: PropTypes.number.isRequired,
    curPricePerDay: PropTypes.number.isRequired,
    curTotalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['open', 'closed']).isRequired,
  })).isRequired,
};
