import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import RentedCarsTable from './rentedCarsTable/RentedCarsTable';
import { API_ROOT } from '../constants/constants';
import { setRentals } from '../actions/setRentalsAction';

class CurrentRentals extends Component {
  async componentDidMount() {
    const { setRentals } = this.props;
    const rentals = await axios.get(`${API_ROOT}/rentals`);

    setRentals(rentals.data);
  }

  render() {
    const { rentals } = this.props;

    return (
      <div>
        <div className="p-3">
          <h3>Current rentals</h3>
          <RentedCarsTable rentals={[]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rentals: state.rentals,
});

export default connect(mapStateToProps, { setRentals })(CurrentRentals);

// CurrentRentals.propTypes = {
//   rentals: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     estimatedDate: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired,
//     status: PropTypes.oneOf(['open', 'closed']).isRequired,
//     returnDate: PropTypes.string.isRequired,
//     car: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       model: PropTypes.string.isRequired,
//       picture: PropTypes.string.isRequired,
//     }).isRequired,
//   })).isRequired,
// };
