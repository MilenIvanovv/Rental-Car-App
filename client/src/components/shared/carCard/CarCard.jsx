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
        <div className="card-body">
          <p className="card-text">
            Model
            <span><b>{car.model}</b></span>
            <br />
            Class
            <span>{car.class.name}</span>
            <br />
            Price per day
            <span>{car.class.price}</span>
            <br />
          </p>
          {noButton
            ? ''
            : <Link to={`${match.url}/${car.id}`} className="btn btn-primary">
                Checkout
              </Link>}
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
  }
};
