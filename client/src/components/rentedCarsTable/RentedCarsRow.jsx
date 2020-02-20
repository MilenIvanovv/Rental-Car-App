import React from 'react';
import PropTypes from 'prop-types';

export default function RentedCarsRow(props) {
  const { rental } = props;

  return (
    <tr>
      <td>{rental.model}</td>
      <td>{rental.customer}</td>
      <td>{rental.dateFrom}</td>
      <td>{rental.estimatedDate}</td>
      <td>{rental.estimatedDays}</td>
      <td>{rental.estimatedPricePerDay}</td>
      <td>{rental.curDaysRented}</td>
      <td>{rental.curPricePerDay}</td>
      <td>{rental.curTotalPrice}</td>
      <td><button type="button">Return car</button></td>
    </tr>
  );
}

RentedCarsRow.propTypes = {
  rental: PropTypes.exact({
    model: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    estimatedDate: PropTypes.string.isRequired,
    estimatedDays: PropTypes.string.isRequired,
    estimatedPricePerDay: PropTypes.string.isRequired,
    curDaysRented: PropTypes.string.isRequired,
    curPricePerDay: PropTypes.string.isRequired,
    curTotalPrice: PropTypes.string.isRequired,
  }).isRequired,
};
