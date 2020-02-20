import React, { Component } from 'react';
import './checkoutPage.css';

export default class RentCarForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      returnDate: '',
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLasttNameChange = this.handleLasttNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleReturnDateChange = this.handleReturnDateChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.submitForm) {
      // pass form data
      // get it from state
      const formData = {};
    }
  }

  handleFirstNameChange(ev) {
    this.setState({
      firstName: ev.target.value
    })
  }

  handleLasttNameChange(ev) {
    this.setState({
      lastName: ev.target.value
    })
  }

  handleAgeChange(ev) {
    this.setState({
      age: ev.target.value
    })
  }

  handleReturnDateChange(ev) {
    this.setState({
      returnDate: ev.target.value
    })
  }

  render() {
    return (
      <form className="rental-car-form">
        <div>First name</div>
        <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        <div>Last name</div>
        <input type="text" value={this.state.lastName} onChange={this.handleLasttNameChange}/>
        <div>Age</div>
        <input type="text" value={this.state.age} onChange={this.handleAgeChange}/>
        <div>Return date</div>
        <input type="text" value={this.state.returnDate} onChange={this.handleReturnDateChange}/>
      </form>
    )
  }
}
