import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './checkoutPage.css';

export default class RentCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      returnDate: '',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLasttNameChange = this.handleLasttNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleReturnDateChange = this.handleReturnDateChange.bind(this);
  }

  componentDidUpdate() {
    const { submitForm, onSubmit } = this.props;

    if (submitForm) {
      onSubmit(this.state);
    }
  }

  handleFirstNameChange(ev) {
    this.setState({
      firstName: ev.target.value,
    });
  }

  handleLasttNameChange(ev) {
    this.setState({
      lastName: ev.target.value,
    });
  }

  handleAgeChange(ev) {
    this.setState({
      age: ev.target.value,
    });
  }

  handleReturnDateChange(ev) {
    this.setState({
      returnDate: ev.target.value,
    });
  }

  render() {
    const {
      firstName,
      lastName,
      age,
      returnDate,
    } = this.state;

    return (
      <form>
        <div className="form-group">
          <div>First name</div>
          <input type="email" className="form-control" value={firstName} onChange={this.handleFirstNameChange} />
          <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <div>Last name</div>
          <input type="text" className="form-control" value={lastName} onChange={this.handleLasttNameChange} />
        </div>
        <div className="form-group">
          <div>Age</div>
          <input type="number" min="18" className="form-control" value={age} onChange={this.handleAgeChange} />
        </div>
        <div className="form-group">
          <div>Return date</div>
          <input type="date" className="form-control" value={returnDate} onChange={this.handleReturnDateChange} />
        </div>
      </form>
    );
  }
}

RentCarForm.propTypes = {
  submitForm: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

RentCarForm.defaultProps = {
  submitForm: false,
};
