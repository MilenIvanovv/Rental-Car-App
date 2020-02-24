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
          <th>Estimated price per day</th>
          <th>Current days rented</th>
          <th>Current price per day</th>
          <th>Current total price</th>
        </tr>
      </thead>
      <tbody>
        {elements}
      </tbody>
    </table>
  );
}

// RentedCarsTable.propTypes = {
//   rentals: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     estimatedDate: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired,
//     status: PropTypes.oneOf(['open', 'closed']).isRequired,
//     returnDate: PropTypes.string.isRequired,
//     car: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       model: PropTypes.string.isRequired,
//       picture: PropTypes.string.isRequired,
//     }).isRequired,
//   })).isRequired,
// };

RentedCarsTable.propTypes = {
  rentals: PropTypes.arrayOf(PropTypes.shape({
    model: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    estimatedDate: PropTypes.string.isRequired,
    estimatedDays: PropTypes.string.isRequired,
    estimatedPricePerDay: PropTypes.string.isRequired,
    curDaysRented: PropTypes.string.isRequired,
    curPricePerDay: PropTypes.string.isRequired,
    curTotalPrice: PropTypes.string.isRequired,
  })),
};
