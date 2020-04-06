import React from 'react';
import PropTypes from 'prop-types';

export default function TotalIncomePerMonth(props) {
  const { result } = props;

  return (
    <span className="section">
      {/* <span> income: ${result.income}</span>
      <span> expenses: ${result.expenses}</span>
      <span> revenue: ${result.revenue}</span> */}
      <span className="price"> ${result.income}</span>
      <span className="price"> ${result.expenses}</span>
      <span className="price"> ${result.revenue}</span>
    </span>
  );
}

TotalIncomePerMonth.propTypes = {
  result: PropTypes.shape({
    income: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
  }),
};

TotalIncomePerMonth.defaultProps = {
  result: {
    income: 0,
    expenses: 0,
    revenue: 0,
  },
};
