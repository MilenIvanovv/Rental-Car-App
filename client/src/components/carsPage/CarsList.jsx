import React from 'react';
import PropTypes from 'prop-types';
import CarCard from '../shared/carCard/CarCard';

export default function CarsList(props) {
  const { cars } = props;
  const carElements = cars.map((car) => <CarCard key={car.model} car={car} />);
  return (
    <div className="row">
      {carElements}
    </div>
  );
}

// CarsList.propTypes = {
//   cars: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     model: PropTypes.string,
//     class: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.string.isRequired,
//     }),
//     price: PropTypes.string,
//     picture: PropTypes.string,
//   })).isRequired,
// };
