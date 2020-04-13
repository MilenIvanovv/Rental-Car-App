import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import CarsList from './CarsList';
import SearchBar from './SearchBar';
import { setCars } from '../../actions/setCarsAction';
import { API_ROOT } from '../../constants/constants';
import Section from '../shared/section/Section';
import FilterBy from './filterBy/FilterBy';

class CarsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      classFilter: null,
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
    const {
      filter,
      loadingCars,
      header,
      classFilter,
    } = this.state;

    const filteredByStatus = cars.filter((car) => car.status === 'listed');

    const classes = Array.from(new Set(filteredByStatus.map((car) => car.class)));

    const filteredByModelAndBrand = filteredByStatus
      .filter((car) => `${car.model} ${car.brand}`.toLowerCase().includes(filter.toLowerCase()))
      .filter((car) => !classFilter || (car.class === classFilter));

    return (
      <Container>
        <Section header={header}>
          <Row>
            <Col>
              <SearchBar onSearch={this.searchHandler} />
            </Col>
            <Col>
              <FilterBy category="Class" actions={classes} select={(value) => this.setState({ classFilter: value })} />
            </Col>
          </Row>
          <CarsList cars={filteredByModelAndBrand} loadingCars={loadingCars} />
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
    id: PropTypes.number.isRequired,
    model: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
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
