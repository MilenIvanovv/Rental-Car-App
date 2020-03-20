import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import RentCarForm from './RentCarForm';
import CarCard from '../shared/carCard/CarCard';
import { API_ROOT } from '../../constants/constants';
import Estimations from './Estimations';
import { Container, Row, Col } from 'react-bootstrap';

function CheckoutPage(props) {
  const { cars } = props;
  const { carId } = useParams();
  const [redirect, setRedirect] = useState();
  const [carToRent, setCarToRent] = useState(null);

  useEffect(() => {
    setCarToRent(cars.find((car) => +car.id === +carId));

    if (!carToRent) {
      new Promise((res) => setTimeout(() => {
        axios.get(`${API_ROOT}/cars/${carId}`)
          .then((data) => {
            setCarToRent(data.data);
            res()
          })
          .catch(() => {
          });
      }, 1000));
    }

  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <h2 className="p-2">Checkout rental car</h2>
      <Container>
        <Row>
          <Col>
            <h4>Car</h4>
            <CarCard car={carToRent} noButton />
          </Col>
          <Col>
            <h4>Booking </h4>
            <RentCarForm />
          </Col>
          <Col>
            <h4>Estimated Price</h4>
            <Estimations car={carToRent} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

CheckoutPage.propTypes = {
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
  })),
};

CheckoutPage.defaultProps = {
  cars: null,
};

export default connect(mapStateToProps)(CheckoutPage);
