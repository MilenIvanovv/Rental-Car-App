import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RentCarForm from './RentCarForm';
import axios from 'axios';
import { API_ROOT } from '../../constants/constants';

function CheckoutPage(props) {
  const { cars } = props;
  const { carId } = useParams();
  const [redirect, setRedirect] = useState();
  const [carToRent, setCarToRent] = useState();

  useEffect(() => {
    setCarToRent(cars.find((car) => +car.id === +carId));

    if (!carToRent) {
      axios.get(`${API_ROOT}/cars/${carId}`)
        .then((data) => {
          setCarToRent(data.data);
        })
        .catch((er) =>  setRedirect('/not-found'));
    }
  }, []);

  if (redirect) {
    return <Redirect to={redirect}/>
  }

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
