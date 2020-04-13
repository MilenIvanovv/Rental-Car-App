import React from 'react';
import PropTypes from 'prop-types';
import RentedCarsRow from './RentedCarsRow';
import './rentedCarsTable.css';
import RentedCarsTableHeader from './RentedCarsTableHeader';


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
  rentals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    car: PropTypes.shape({
      id: PropTypes.number.isRequired,
      model: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      picture: PropTypes.any.isRequired,
    }),
    client: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    }),
    dateFrom: PropTypes.string.isRequired,
    estimatedDate: PropTypes.string.isRequired,
    estimatedDays: PropTypes.number.isRequired,
    estimatedPricePerDay: PropTypes.number.isRequired,
    curDaysRented: PropTypes.number.isRequired,
    curPricePerDay: PropTypes.number.isRequired,
    curTotalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['open', 'returned']).isRequired,
  })).isRequired,

  returnCar: PropTypes.func.isRequired,
};
