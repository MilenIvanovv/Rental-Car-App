import React from 'react'

export default function EstimatedPrice(props) {

  const estimated = props.estimated;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <p className="card-text">
          Days <span>{estimated.days}</span><br />
          Price per day <span>{estimated.pricePerDay}</span><br />
          Total <span>{estimated.pricePerDay}</span><br />
        </p>
        <a href="#" className="btn btn-primary">
          Confirm
        </a>
        <a href="#" className="btn btn-primary">
          Cencel
        </a>
      </div>
    </div>
  )
}
