import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarCard from '../shared/carCard/CarCard';
import RentCarForm from './RentCarForm';

function CheckoutPage(props) {
  const { cars } = props;
  const { carId } = useParams();

  const carToRent = cars.find((car) => +car.id === +carId);
  console.log(carToRent);
  return (
    <div>
      <h2 className="p-2">Checkout rental car</h2>
      <div className="container">
        <div className="row">
          <RentCarForm car={carToRent} estimations={{}} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

// CheckoutPage.propTypes = {
//   cars: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     model: PropTypes.string.isRequired,
//     class: PropTypes.string.isRequired,
//     price: PropTypes.string.isRequired,
//     picture: PropTypes.string.isRequired,
//   })).isRequired,
// };

export default connect(mapStateToProps)(CheckoutPage);
