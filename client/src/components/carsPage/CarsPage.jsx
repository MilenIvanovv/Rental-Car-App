import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import CarsList from './CarsList';
import SearchBar from './SearchBar';
import { setCars } from '../../actions/setCarsAction';
import { API_ROOT } from '../../constants/constants';
import Section from '../shared/section/Section';


class CarsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      loadingCars: false,
      header: 'Car list',
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  async componentDidMount() {
    const { cars } = this.props;

    if (!cars.length) {
      await this.getCars();
    }
  }

  async getCars() {
    const { setCars: dispatchSetCars } = this.props;

    let cars;
    this.setState({ loadingCars: true });
    try {
      cars = await axios.get(`${API_ROOT}/cars`);
    } catch (error) {
      console.log(error);
    }
    this.setState({ loadingCars: false });
    dispatchSetCars(cars.data);
  }

  searchHandler(e, filter) {
    if (filter === '') {
      this.setState({ header: 'Cars List' });
    } else {
      this.setState({ header: 'Searching cars' });
    }

    e.preventDefault();
    this.setState({ filter });
  }

  render() {
    const { cars } = this.props;
    const { filter, loadingCars, header } = this.state;
    const filteredByStatus = cars.filter((car) => car.status === 'listed');
    const filteredByModel = filteredByStatus
      .filter((car) => car.model.toLowerCase().includes(filter.toLowerCase()));

    return (
      <Container>
        <Section header={header}>
          <SearchBar onSearch={this.searchHandler} />
          <CarsList cars={filteredByModel} loadingCars={loadingCars} />
        </Section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

CarsPage.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    model: PropTypes.string,
    class: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    picture: PropTypes.any.isRequired,
    status: PropTypes.string.isRequired,
  })),
  setCars: PropTypes.func.isRequired,
};

CarsPage.defaultProps = {
  cars: null,
};

export default connect(mapStateToProps, { setCars })(CarsPage);
