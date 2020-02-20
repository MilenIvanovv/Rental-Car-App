import React from 'react';

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
      <td><button>Return car</button></td>
    </tr>
  );
}
