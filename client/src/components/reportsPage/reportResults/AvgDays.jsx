
import React from 'react';
import PropTypes from 'prop-types';

export default function AvgDays(props) {
  const { result } = props;

  return (
    <span className="section">
      <span>{result}</span>
      {/* <span>days: {result}</span> */}

    </span>
  );
}

AvgDays.propTypes = {
  result: PropTypes.number,
};

AvgDays.defaultProps = {
  result: 0,
};
