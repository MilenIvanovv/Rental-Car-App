import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRentals } from '../../actions/setRentalsAction';
import { setCars } from '../../actions/setCarsAction';
import setRentalCarForm from '../../actions/setRentCarFormActions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import './rentCarForm.css';


class RentCarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateValue: this.props.rentCarForm.returnDate.value
    }

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <form>
        {this.formInput({ title: 'First Name', type: 'text', name: 'firstName', data: 'firstName' })}
        {this.formInput({ title: 'Last name', type: 'text', name: 'lastName', data: 'lastName' })}
        {this.formInput({ title: 'Age', type: 'number', name: 'age', data: 'age' })}
        {this.datePicker()}
      </form>
    );
  }

  handleChange(ev) {
    const name = ev.target.name;
    const value = ev.target.value;
    const form = this.props.rentCarForm;
    let tempForm = JSON.parse(JSON.stringify(form));
    tempForm[name].value = value;
    tempForm = this.validateInput(tempForm, name);
    this.props.modifyForm(tempForm);
  }

  validateInput(form, name) {
    const tempForm = JSON.parse(JSON.stringify(form));
    console.log('validating')
    tempForm[name].error = tempForm[name].value === '' ? 'cannot be empty!' : '';

    if (name === 'age') {
      tempForm[name].error = +tempForm[name].value < 18 ? 'cannot be under 18!' : '';
    }

    tempForm.isFormValid = !Object.values(tempForm)
      .some((x) => x.error && (x.error !== 'not touched' || x.error !== ''));

    return tempForm;
  }

  formInput({ title, type, name, data }) {
    const input = this.props.rentCarForm[name];
    const isFormValid = this.props.rentCarForm.isFormValid;
    const error = !(input.error === '' || input.error === 'not touched') ? input.error : null;
    const errorMsg = (<small className="form-text not-valid">
      {`${title} ${error}`}
    </small>);

    return (
      <div className="form-group">
        <div>{title}</div>
        <input
          type={type}
          name={name} // user by handleChange
          data={data} // used for nightwatch
          min={name === 'age' ? 18 : false}
          className={!isFormValid && error ? 'form-control is-invalid' : 'form-control'}
          value={input.value}
          onChange={this.handleChange}
        />
        {error && errorMsg}
      </div>
    )
  }

  datePicker() {
    const date = this.props.rentCarForm.returnDate.value;

    return (
      <div className="form-group">
        <div>Date</div>
        <DatePicker
          isClearable
          data="date"
          className="form-control"
          selected={date ? new Date(date) : null}
          onChange={(val) => this.handleChange({ target: { value: val, name: 'returnDate' } })}
          showTimeSelect
          minDate={new Date()}
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>)
  }
}

RentCarForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  rentCarForm: PropTypes.shape({
    firstName: PropTypes.shape({
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    lastName: PropTypes.shape({
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    age: PropTypes.shape({
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    returnDate: PropTypes.shape({
      value: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    isFormValid: PropTypes.bool.isRequired,
  }),
};

RentCarForm.defaultProps = {
  car: null,
};

const mapStateToProps = (state) => ({
  rentals: state.rentals,
  rentCarForm: state.form,
});

const mapActionsToProps = {
  setRentals,
  setCars,
  modifyForm: setRentalCarForm.modifyForm,
  setIsFormValid: setRentalCarForm.isFormValid,
}

export default connect(mapStateToProps, mapActionsToProps)(RentCarForm);
