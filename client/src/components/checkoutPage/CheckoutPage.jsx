import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CarCard from '../shared/carCard/CarCard';
import RentCarForm from './RentCarForm';
import EstimatedPrice from './EstimatedPrice';

function CheckoutPage(props) {
  const { cars } = props;
  const { carId } = useParams();
  const [rediect, setRedirect] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);

  const carToRent = cars.find((car) => car.id === carId);

  if (rediect) {
    return <Redirect to={rediect} />;
  }

  if (!carToRent) {
    return <Redirect to="/not-found" />;
  }

  const confirmHanlder = () => {
    setSubmitForm(true);
  };

  const onSubmitHandler = (data) => {
    console.log(data);
    setRedirect('./current-rental');
  };

  return (
    <div>
      <h2 className="p-2">Checkout rental car</h2>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h4>Car</h4>
            <CarCard car={carToRent} />
          </div>
          <div className="col-4">
            <h4>Booking</h4>
            <RentCarForm submitForm={submitForm} onSubmit={onSubmitHandler} />
          </div>
          <div className="col-4">
            <h4>Estimated Price</h4>
            <EstimatedPrice confirmHanlder={confirmHanlder} estimated={{}} />
          </div>
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
