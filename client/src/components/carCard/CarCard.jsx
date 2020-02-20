import React, { Component } from 'react';
import './carCard.css';

export default class CarCard extends Component {
  render() {

    const car = this.props.car;

    return (
      <div className="card" style={{ width: "18rem" }}>
        <img src={car.picture} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">
            <div>
              Model <span><b>{car.model}</b></span>
            </div>
            <div>
              Class <span>{car.class}</span>
            </div>
            <div>
              Price per day <span>{car.price}</span>
            </div>
          </p>
        </div>
      </div>
    )
  }
}
