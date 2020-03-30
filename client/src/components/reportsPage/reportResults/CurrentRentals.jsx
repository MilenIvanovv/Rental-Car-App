import React from 'react'

export default function CurrentRentals(props) {

  const { result } = props;

  return (
  <span className="section">
      <span> cars: {result || 0} %</span>
  </span>
  )
}
