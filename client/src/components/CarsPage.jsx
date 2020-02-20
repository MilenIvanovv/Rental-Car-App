import React, { Component } from 'react';
import { connect } from 'react-redux';
import CarsList from './CarsList';
import SearchBar from './SearchBar';
import { setCars } from '../actions/setCarsAction';

class CarsPage extends Component {
  componentDidMount() {
    const mockCars = [
      {
        id: '1234',
        model: 'Ford Fiesta',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      },
      {},
      {},
      {},
      {},
      {},
      {},
    ];

    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    this.props.setCars(mockCars);
  }

  render() {
    // eslint-disable-next-line react/prop-types
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

export default connect(mapStateToProps, { setCars })(CarsPage);
