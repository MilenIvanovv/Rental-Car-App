import React, { Component } from 'react'

export default class CarCard extends Component {
  render() {

    const applyStyle = {
      height: '300px',
      width: '150px'
    }

    return (
      <div className="col-3" style={applyStyle} >
        <h3>Car card</h3>
      </div>
    )
  }
}
