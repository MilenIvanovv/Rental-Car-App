import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import CarCard from '../shared/carCard/CarCard';

export default function CarsList(props) {
  const { cars, loadingCars } = props;

  if (loadingCars) {
    return <h1>Loading cars</h1>;
  }

  if (!cars.length) {
    return <h1 data="no-cars">No cars found</h1>;
  }

  const carElements = cars.map((car) => <Col className="mb-3" xs={4} key={car.model}><CarCard car={car} /></Col>);

  return (
    <Row>
      {carElements}
    </Row>
  );
}

CarsList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  loadingCars: PropTypes.bool.isRequired,
};
