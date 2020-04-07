import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import RentCarForm from './rentCarForm/RentCarForm';
import CarCard from '../shared/carCard/CarCard';
import { API_ROOT } from '../../constants/constants';
// eslint-disable-next-line import/no-named-as-default
import Estimations from './estimatoins/Estimations';
import Section from '../shared/section/Section';
import InnerHeader from '../shared/innerHeader/InnerHeader';

function CheckoutPage(props) {
  const { cars } = props;
  const { carId } = useParams();
  const [carToRent, setCarToRent] = useState(null);

  useEffect(() => {
    setCarToRent(cars.find((car) => +car.id === +carId));

    if (!carToRent) {
      axios.get(`${API_ROOT}/cars/${carId}`)
        .then((data) => setCarToRent(data.data));
    }
  }, []);

  return (
    <div>
      <Container>
        <Section header="Checkout rental car">
          <Row className="center-in-colums">
            <Col>
              <div>
                <InnerHeader text="Car" />
                <CarCard car={carToRent} noButton />
              </div>
            </Col>
            <Col>
              <div>
                <InnerHeader text="Booking" />
                <RentCarForm />
              </div>
            </Col>
            <Col>
              <div>
                <InnerHeader text="Estimated Price" />
                <Estimations car={carToRent} />
              </div>
            </Col>
          </Row>
        </Section>
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
    class: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    insuranceFeePerYear: PropTypes.number.isRequired,
    monthlyExpences: PropTypes.number.isRequired,
  })),
};

CheckoutPage.defaultProps = {
  cars: null,
};

export default connect(mapStateToProps)(CheckoutPage);
