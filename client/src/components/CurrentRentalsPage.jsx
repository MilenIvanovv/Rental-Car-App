import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import RentedCarsTable from './rentedCarsTable/RentedCarsTable';
import { API_ROOT } from '../constants/constants';

class CurrentRentals extends Component {
  async componentDidMount() {
    const rentals = await axios.get(`${API_ROOT}/rentals`);
    console.log(rentals);
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

export default connect(mapStateToProps)(CurrentRentals);

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
