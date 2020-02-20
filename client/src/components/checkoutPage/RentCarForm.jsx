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
      <form>
        <div className="form-group">
          <label>First name</label>
          <input type="email" className="form-control" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input type="password" className="form-control" value={this.state.lastName} onChange={this.handleLasttNameChange}/>
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="password" className="form-control" value={this.state.age} onChange={this.handleAgeChange}/>
        </div>
        <div className="form-group">
          <label>Return date</label>
          <input type="password" className="form-control" value={this.state.returnDate} onChange={this.handleReturnDateChange}/>
        </div>
      </form>
    )
  }
}