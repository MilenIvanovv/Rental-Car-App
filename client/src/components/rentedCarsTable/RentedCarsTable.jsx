import React from 'react';
import RentedCarsRow from './RentedCarsRow';
import './RentedCarsTable.css';

export default function RentedCarsTable() {
  const rows = [
    {},
    {},
    {},
    {},
    {},
  ];

  const elements = rows.map((rental) => <RentedCarsRow key={rental.model} rental={rental} />);

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
