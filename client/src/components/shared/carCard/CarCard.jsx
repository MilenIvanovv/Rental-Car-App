import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import './carCard.css';

export default function CarCard(props) {
  const match = useRouteMatch();

  const { car, noButton } = props;

  if (!car) {
    return <h1>Loading car...</h1>
  }

  const checkoutBtn = () => !noButton && (
    <Link to={`${match.url}/${car.id}`} className="btn btn-primary" data="card_checkout">
      Checkout
    </Link>
  );

  return (
    <div className="card">
      <Link to={`${match.url}/${car.id}`}>
        <img src={car.picture} className="card-img-top" alt="..." />
      </Link>
      <div className="card-body align-card-text">
        <div className="card-text">
          <p className="w-50">
            <span>Model</span>
            <span>Class</span>
            <span>Price per day</span>
          </p>
          <p>
            <span><b data="model">{car.model}</b></span>
            <span>{car.class}</span>
            <span>{`$${car.price}`}</span>
          </p>
        </div>
        <div className="d-flex justify-content-center">
          {checkoutBtn()}
        </div>
      </div>
    </div>
  );
}

CarCard.propTypes = {
  car: PropTypes.exact({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.string,
    price: PropTypes.number,
    picture: PropTypes.string,
    status: PropTypes.string,
    insuranceFeePerYear: PropTypes.number,
    monthlyExpences: PropTypes.number,
  }),
  noButton: PropTypes.bool,
};

CarCard.defaultProps = {
  car: null,
  noButton: false,
};



