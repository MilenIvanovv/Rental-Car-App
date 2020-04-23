import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import CarCard from '../shared/carCard/CarCard';
import LoadingIdicator from '../shared/loadingIndicator/LoadingIdicator';
import { carTypes } from '../../common/models/prop-types';
import NotFound from '../shared/notFound/NotFound';

export default function CarsList(props) {
  const { cars, loadingCars } = props;

  if (loadingCars) {
    return <LoadingIdicator />;
  }

  if (!cars.length) {
    return <span data="no-cars"><NotFound text="No cars found" /></span>;
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
