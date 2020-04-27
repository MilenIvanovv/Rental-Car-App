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
import { filters } from './filters';
import { carTypes } from '../../common/models/prop-types';
import './carsPage.css';

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
    const {
      filter,
      loadingCars,
      header,
    } = this.state;

    let filteredCars = cars
      .filter((car) => car.status === 'listed')
      .filter((car) => `${car.brand} ${car.model}`.toLowerCase().includes(filter.toLowerCase()));

    filters.forEach((x) => {
      filteredCars = filteredCars
      // eslint-disable-next-line react/destructuring-assignment
        .filter((car) => !this.state[x.inState] || (x.property(car) === this.state[x.inState]));
    });

    const dropdowns = filters.map((x) => {
      // eslint-disable-next-line react/destructuring-assignment
      const set = Array.from(new Set(filteredCars.map(x.property)));
      return <FilterBy key={x.category} category={x.category} actions={set} select={(value) => this.setState({ [x.inState]: value })} />;
    });

    return (
      <Container>
        <Section header={header}>
          <Row>
            <Col>
              <SearchBar onSearch={this.searchHandler} />
            </Col>
            <Col className="filter-dropdowns">
              {dropdowns}
            </Col>
          </Row>
          <CarsList cars={filteredCars} loadingCars={loadingCars} />
        </Section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cars: state.cars,
});

CarsPage.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.shape(carTypes)),
  setCars: PropTypes.func.isRequired,
};

CarsPage.defaultProps = {
  cars: null,
};

export default connect(mapStateToProps, { setCars })(CarsPage);
