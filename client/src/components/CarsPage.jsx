import React, { Component } from 'react'
import CarsList from './CarsList';

export default class CarsPage extends Component {
  render() {

    const cars = [
      {
        model: 'Ford Fiesta',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      },
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
