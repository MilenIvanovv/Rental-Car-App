import React from 'react';
import PropTypes from 'prop-types';

export default function CurrentRentals(props) {
  const { result } = props;

  return (
    <span className="section">
      <span> cars: {result} %</span>
    </span>
  );
}

CurrentRentals.propTypes = {
  result: PropTypes.number,
};

CurrentRentals.defaultProps = {
  result: 0,
};
