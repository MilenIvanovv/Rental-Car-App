import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function EstimatedPrice(props) {
  const { estimated, confirmHanlder } = props;

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <p className="card-text">
          Days
          {' '}
          <span>{estimated.days}</span>
          <br />
          Price per day
          {' '}
          <span>{estimated.pricePerDay}</span>
          <br />
          Total
          {' '}
          <span>{estimated.totalPrice}</span>
          <br />
        </p>
        <button type="button" className="btn btn-primary" onClick={confirmHanlder}>
          Confirm
        </button>
        <Link to="/cars">
          <button type="button" className="btn btn-primary">
            Cencel
          </button>
        </Link>
      </div>
    </div>
  );
}

EstimatedPrice.propTypes = {
  estimated: PropTypes.exact({
    days: PropTypes.string,
    pricePerDay: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
  confirmHanlder: PropTypes.func.isRequired,
};
