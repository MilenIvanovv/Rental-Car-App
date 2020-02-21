import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CarsList from './CarsList';
import SearchBar from './SearchBar';
import { setCars } from '../../actions/setCarsAction';

class CarsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

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
      {
        id: '1234',
        model: 'dgerga',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      }, {
        id: '1234',
        model: 'sfghdfghf',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      }, {
        id: '1234',
        model: 'sdfga',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      }, {
        id: '1234',
        model: 'a',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      }, {
        id: '1234',
        model: 'b',
        class: 'A',
        price: '28$',
        picture: 'https://stalbertseniors.ca/wp-content/uploads/2019/10/image-coming-soon.jpg',
      },
    ];

    dispatchSetCars(mockCars);
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
