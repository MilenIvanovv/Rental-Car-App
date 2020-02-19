import React from 'react'
import CarCard from './CarCard'

export default function CarsList(props) {

  const cars = props.cars.map((car) => <CarCard car={car} />)

  return (
    <div className="row">
      {cars}
    </div>
  )
}
