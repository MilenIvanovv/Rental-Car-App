import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarCard from '../shared/carCard/CarCard';
import RentCarForm from './RentCarForm';

function CheckoutPage(props) {
  const { cars } = props;
  const { carId } = useParams();

  const carToRent = cars.find((car) => car.id === carId);

  return (
    <div>
      <h2 className="p-2">Checkout rental car</h2>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h4>Car</h4>
            <CarCard car={carToRent} />
          </div>
          <RentCarForm />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

CheckoutPage.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    model: PropTypes.string,
    class: PropTypes.string,
    price: PropTypes.string,
    picture: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(CheckoutPage);
