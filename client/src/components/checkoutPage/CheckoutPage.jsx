import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RentCarForm from './RentCarForm';

function CheckoutPage(props) {
  const { cars } = props;
  const { carId } = useParams();

  const carToRent = cars.find((car) => +car.id === +carId);

  return (
    <div>
      <h2 className="p-2">Checkout rental car</h2>
      <div className="container">
        <div className="row">
          <RentCarForm car={carToRent} />
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
