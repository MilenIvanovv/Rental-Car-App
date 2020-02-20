import React from 'react';
import PropTypes from 'prop-types';

export default function EstimatedPrice(props) {
  const { estimated } = props;

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
        <button type="button" className="btn btn-primary">
          Confirm
        </button>
        <button type="button" className="btn btn-primary">
          Cencel
        </button>
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
};
