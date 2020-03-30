import React from 'react'

export default function AvgIncomePerMonth(props) {

  const { result } = props;

  return (
  <span className="section">
      <span> income: {result || 0} $</span>
  </span>
  )
}
