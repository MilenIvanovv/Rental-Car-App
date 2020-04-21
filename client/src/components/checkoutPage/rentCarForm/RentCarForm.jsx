import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import setRentalCarForm from '../../../actions/setRentCarFormActions';
import { carTypes } from '../../../common/models/prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import './rentCarForm.css';

class RentCarForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    return (
      <form className="form-container p-3">
        {this.formInput({
          title: 'First Name', type: 'text', name: 'firstName', data: 'firstName',
        })}
        {this.formInput({
          title: 'Last name', type: 'text', name: 'lastName', data: 'lastName',
        })}
        {this.formInput({
          title: 'Age', type: 'number', name: 'age', data: 'age',
        })}
        {this.datePicker()}
      </form>
    );
  }

  handleChange(ev) {
    const { rentCarForm, modifyForm } = this.props;
    const { name, value } = ev.target;
    let tempForm = JSON.parse(JSON.stringify(rentCarForm));
    tempForm[name].value = value;
    tempForm = this.validateInput(tempForm, name);
    modifyForm(tempForm);
  }

  // eslint-disable-next-line class-methods-use-this
  validateInput(form, name) {
    const tempForm = JSON.parse(JSON.stringify(form));
    tempForm[name].error = tempForm[name].value === '' ? 'cannot be empty!' : '';

    if (name === 'age') {
      tempForm[name].error = +tempForm[name].value < 18 ? 'cannot be under 18!' : '';
    }

    tempForm.isFormValid = !Object.values(tempForm)
      .some((x) => x.error && (x.error !== 'not touched' || x.error !== ''));

    return tempForm;
  }

  formInput({
    title, type, name, data,
  }) {
    const { rentCarForm } = this.props;
    const input = rentCarForm[name];
    const { isFormValid } = rentCarForm;
    const error = !(input.error === '' || input.error === 'not touched') ? input.error : null;
    const errorMsg = (
      <small className="form-text not-valid">
        {`${title} ${error}`}
      </small>
    );

    return (
      <div className="form-group">
        <div>{title}</div>
        <input
          type={type}
          name={name} // user by handleChange
          data={data} // used for nightwatch
          min={name === 'age' ? 18 : undefined}
          className={`form-control ${!isFormValid && error ? 'is-invalid' : ''}`}
          value={input.value}
          onChange={this.handleChange}
        />
        {error && errorMsg}
      </div>
    );
  }

  datePicker() {
    const { rentCarForm } = this.props;
    const date = rentCarForm.returnDate;
    const { isFormValid } = rentCarForm;
    const error = !(date.error === '' || date.error === 'not touched') ? date.error : null;
    const errorMsg = (
      <small className="form-text not-valid">
        {`Return date ${error}`}
      </small>
    );

    return (
      <div className="form-group">
        <div>Date</div>
        <DatePicker
          isClearable
          data="date"
          className={`form-control ${!isFormValid && error ? 'is-invalid' : ''}`}
          selected={date.value ? new Date(date.value) : null}
          onChange={(val) => this.handleChange({ target: { value: val, name: 'returnDate' } })}
          showTimeSelect
          minDate={new Date()}
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        {error && errorMsg}
      </div>
    );
  }
}

RentCarForm.propTypes = {
  car: PropTypes.shape(carTypes),
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
      value: PropTypes.string,
      error: PropTypes.string.isRequired,
    }),
    isFormValid: PropTypes.bool.isRequired,
  }).isRequired,
  modifyForm: PropTypes.func.isRequired,
};

RentCarForm.defaultProps = {
  car: null,
};

const mapStateToProps = (state) => ({
  rentals: state.rentals,
  rentCarForm: state.form,
});

const mapActionsToProps = {
  modifyForm: setRentalCarForm.modifyForm,
};

export default connect(mapStateToProps, mapActionsToProps)(RentCarForm);
