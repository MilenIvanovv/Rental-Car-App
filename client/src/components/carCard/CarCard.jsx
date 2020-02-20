import React, { Component } from 'react';
import './carCard.css';

export default class CarCard extends Component {
  render() {

    const car = this.props.car;

    return (
      <div className="col-4 mb-2">
        <div className="card" style={{ width: "18rem" }}>
          <img src={car.picture} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">
              Model <span><b>{car.model}</b></span><br />
              Class <span>{car.class}</span><br />
              Price per day <span>{car.price}</span><br />
            </p>
          </div>
        </div>
      </div>
    )
  }
}
