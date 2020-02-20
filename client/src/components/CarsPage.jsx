import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CarsList from './CarsList';
import SearchBar from './SearchBar';
import { setCars } from '../actions/setCarsAction';

class CarsPage extends Component {
  componentDidMount() {
    const { setCars: dispatchSetCars } = this.props;
    const mockCars = [
      {
        id: '1234',
        model: 'Ford Fiesta',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      },
    ];

    dispatchSetCars(mockCars);
  }

  render() {
    const { cars } = this.props;

    return (
      <div className="container">
        <SearchBar />
        <CarsList cars={cars} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

CarsPage.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    model: PropTypes.string,
    class: PropTypes.string,
    price: PropTypes.string,
    picture: PropTypes.string,
  })),
  setCars: PropTypes.func.isRequired,
};

CarsPage.defaultProps = {
  cars: null,
};

export default connect(mapStateToProps, { setCars })(CarsPage);
