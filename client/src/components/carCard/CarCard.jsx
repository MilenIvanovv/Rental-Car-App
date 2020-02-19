import React, { Component } from 'react';
import './carCard.css';

export default class CarCard extends Component {
  render() {

    const car = this.props.car;

    return (
      <div className="col-3 mb-3">
        <div className={this.props.noBorder ? 'card-container' : 'card-container  card-border-black'}>
          <div className="img-container">
            <img src={car.picture} />
          </div>
          <div className="card-details">
            <div>
              <span>Model</span>
              <span>Class</span>
              <span>Price per day</span>
            </div>
            <div>
              <span><b>{car.model}</b></span>
              <span>{car.class}</span>
              <span>{car.price}</span>
            </div>
          </div>
          <div className="card-btn-container">
            <button className="card-btn">checkout</button>
          </div>
        </div>
      </div>
    )
  }
}
