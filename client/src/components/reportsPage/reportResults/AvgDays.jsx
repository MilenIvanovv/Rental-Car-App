import React from 'react'

export default function AvgDays(props) {

  const { result } = props;

  return (
  <span className="section">
      <span>days: {result || 0}</span>
  </span>
  )
}
