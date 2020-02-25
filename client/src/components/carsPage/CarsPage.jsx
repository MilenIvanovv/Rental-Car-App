import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import CarsList from './CarsList';
import SearchBar from './SearchBar';
import { setCars } from '../../actions/setCarsAction';
import { API_ROOT } from '../../constants/constants';

class CarsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  async componentDidMount() {
    const { setCars: dispatchSetCars } = this.props;

    const cars = await axios.get(`${API_ROOT}/cars`);
    dispatchSetCars(cars.data);
  }

  searchHandler(e, filter) {
    e.preventDefault();
    this.setState({ filter });
  }

  render() {
    const { cars } = this.props;
    const { filter } = this.state;
    const filteredCars = cars.filter((car) => car.model.includes(filter));

    return (
      <div className="container">
        <SearchBar onSearch={this.searchHandler} />
        <CarsList cars={filteredCars} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

// CarsPage.propTypes = {
//   cars: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     model: PropTypes.string,
//     class: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//     }),
//     picture: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//   })),
//   setCars: PropTypes.func.isRequired,
// };

// CarsPage.defaultProps = {
//   cars: null,
// };

export default connect(mapStateToProps, { setCars })(CarsPage);
