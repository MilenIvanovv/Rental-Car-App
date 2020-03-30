import React from 'react'

export default function TotalIncomePerMonth(props) {

  const { result } = props;

  return (
  <span className="section">
      <span> income: {result.income || 0} $</span>
      <span> expenses: {result.expenses || 0} $</span>
      <span> revenue: {result.revenue || 0} $</span>
  </span>
  )
}
