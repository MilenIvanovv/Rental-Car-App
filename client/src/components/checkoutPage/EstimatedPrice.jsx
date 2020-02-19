import React from 'react'

export default function EstimatedPrice(props) {

  const estimated = props.estimated;

  return (
    <div className="card-details">
      <div>
        <span>Days</span>
        <span>Price per day</span>
        <span>Total</span>
      </div>
      <div>
        <span>{estimated.days}</span>
        <span>{estimated.pricePerDay}</span>
        <span>{estimated.totalPrice}</span>
      </div>
    </div>
  )
}
