import React from 'react';
import PropTypes from 'prop-types';
import CarCard from '../shared/carCard/CarCard';

export default function CarsList(props) {
  const { cars, loadingCars } = props;

  if (loadingCars) {
    return <h1>Loading cars</h1>
  }
  
  if (!cars.length) {
    return <h1>No cars found</h1>
  }

  const carElements = cars.map((car) => <CarCard key={car.model} car={car} />);
  return (
    <div className="row" id="car-list">
      {carElements}
    </div>
  );
}

CarsList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
    picture: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    loadingCars: PropTypes.bool.isRequired,
  })).isRequired,
};
