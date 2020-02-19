import React, { Component } from 'react'
import CarsList from './CarsList';

export default class CarsPage extends Component {
  render() {

    const cars = [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ];

    return (
      <div className="container">
        <CarsList cars={cars} />
      </div>
    )
  }
}
