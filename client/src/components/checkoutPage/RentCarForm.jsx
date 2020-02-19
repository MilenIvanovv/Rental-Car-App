import React, { Component } from 'react'

export default class RentCarForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      returnDate: '',
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLasttNameChange = this.handleLasttNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleReturnDateChange = this.handleReturnDateChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.submit) {
      // pass form data
      // get it from state
      const formData = {};
      this.finallySubmit();
    }
  }

  handleFormSubmit(ev) {
    ev.preventDefault();
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
      <form onSubmit={this.handleFormSubmit}>
        <label>First name</label>
        <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        <label>Last name</label>
        <input type="text" value={this.state.lastName} onChange={this.handleLasttNameChange}/>
        <label>Age</label>
        <input type="text" value={this.state.age} onChange={this.handleAgeChange}/>
        <label>Return date</label>
        <input type="text" value={this.state.returnDate} onChange={this.handleReturnDateChange}/>
      </form>
    )
  }
}
