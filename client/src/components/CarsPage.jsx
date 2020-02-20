import React from 'react';
import CarsList from './CarsList';
import SearchBar from './SearchBar';

export default function CarsPage() {
  const cars = [
    {
      id: '1234',
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
      <SearchBar />
      <CarsList cars={cars} />
    </div>
  );
}
