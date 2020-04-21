import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import CarCard from '../shared/carCard/CarCard';
import LoadingIdicator from '../shared/loadingIndicator/LoadingIdicator';
import { carTypes } from '../../common/models/prop-types';

export default function CarsList(props) {
  const { cars, loadingCars } = props;

  if (loadingCars) {
    return <LoadingIdicator text="cars" />;
  }

  if (!cars.length) {
    return <h1 data="no-cars">No cars found</h1>;
  }

  const carElements = cars.map((car) => <Col className="mb-3" xs={12} md={6} lg={4} key={car.model}><CarCard car={car} /></Col>);

  return (
    <Row className="center-in-colums">
      {carElements}
    </Row>
  );
}

CarsList.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape(carTypes)).isRequired,
  loadingCars: PropTypes.bool.isRequired,
};
