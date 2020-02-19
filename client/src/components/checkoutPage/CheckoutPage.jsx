import React, { Component } from 'react'
import CarCard from '../carCard/CarCard'
import RentCarForm from './RentCarForm'

export default class CheckoutPage extends Component {
  render() {
    return (
      <div>
        <h2 className="p-2">Checkout rental car</h2>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h3>Car</h3>
              <CarCard noBorder={true} car={{}}/>
            </div>
            <div className="col-4">
              <h3>Booking</h3>
              <RentCarForm/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
