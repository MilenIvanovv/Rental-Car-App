  import React, { Component } from 'react'
import RentedCarsTable from './rentedCarsTable/RentedCarsTable'
  
  export default class CurrentRentals extends Component {
    render() {
      return (
        <div>
          <div className="p-3">
            <h3>Current rentals</h3>
            <RentedCarsTable/>
          </div>
        </div>
      )
    }
  }
  