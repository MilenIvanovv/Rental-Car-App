import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import './carCard.css';

export default function CarCard(props) {
  const match = useRouteMatch();

  const { car, noButton } = props;

  return (
    <div className="col-4 mb-2">
      <div className="card" style={{ width: '18rem' }}>
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
              <span><b>{car.model}</b></span>
              <span>{car.class.name}</span>
              <span>
                {car.class.price}
                {' $'}
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center">
            {noButton
              ? ''
              : (
                <Link to={`${match.url}/${car.id}`} className="btn btn-primary">
                  Checkout
                </Link>
              )}
          </div>

        </div>
      </div>
    </div>
  );
}

CarCard.propTypes = {
  car: PropTypes.exact({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
    }),
    picture: PropTypes.string,
    status: PropTypes.string,
  }),
  noButton: PropTypes.bool,
};

CarCard.defaultProps = {
  car: {
    id: 0,
    model: '',
    class: {
      id: 0,
      name: '',
      price: 0,
    },
    picture: '',
    status: '',
  },
  noButton: false,
};
