import React from 'react';
import PropTypes from 'prop-types';


export default function AvgIncomePerMonth(props) {
  const { result } = props;

  return (
    <span className="section">
      <span> income: ${result}</span>
    </span>
  );
}

AvgIncomePerMonth.propTypes = {
  result: PropTypes.number,
};

AvgIncomePerMonth.defaultProps = {
  result: 0,
};
