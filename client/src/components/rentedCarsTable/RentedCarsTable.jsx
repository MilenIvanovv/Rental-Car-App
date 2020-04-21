import React from 'react';
import PropTypes from 'prop-types';
import RentedCarsRow from './RentedCarsRow';
import './rentedCarsTable.css';
import RentedCarsTableHeader from './RentedCarsTableHeader';
import { rentalTypes } from '../../common/models/prop-types';

export default function RentedCarsTable(props) {
  const { rentals, returnCar } = props;

  const colums = [
    'Car',
    'Customer',
    'From',
    'Estimated date',
    'Estimated rented days',
    'Estimated price per day',
    'Current rented days',
    'Current price per day',
    'Current total price',
    '',
  ];

  const elements = rentals
    .map((rental) => (
      <RentedCarsRow
        key={rental.car.model}
        rental={rental}
        returnCar={returnCar}
      />
    ));

  return (
    <table className="table">
      <thead>
        <RentedCarsTableHeader colums={colums} />
      </thead>
      <tbody>
        {elements}
      </tbody>
    </table>
  );
}

RentedCarsTable.propTypes = {
  rentals: PropTypes.arrayOf(PropTypes.shape(rentalTypes)).isRequired,
  returnCar: PropTypes.func.isRequired,
};
