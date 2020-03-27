import React, { Component } from 'react'
import Report from './Report'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { API_ROOT } from '../../constants/constants';
import AvgDays from './reportResults/AvgDays';
import AvgIncomePerMonth from './reportResults/AvgIncomePerMonth';
import CurrentRentals from './reportResults/CurrentRentals';



export default class ReportsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      averageDaysPerClass: {
        data: [],
        loading: false,
      },
      currentlyRentedCarsPerClass: {
        data: [],
        loading: false,
      },
      averageIncomePerClass: {
        data: [],
        loading: false,
      },
    };
  }

  render() {

    const { averageDaysPerClass, currentlyRentedCarsPerClass, averageIncomePerClass } = this.state;

    return (
      <Container>
        <Row className="mb-3">
          <Col xs={4}>
            <Report title="Average days per class" report={averageDaysPerClass}>
              <AvgDays />
            </Report>
          </Col>
          <Col xs={4}>
            <Report title="Current rented cars per class" report={currentlyRentedCarsPerClass}>
              <CurrentRentals />
            </Report>
          </Col>
          <Col xs={4}>
            <Report title="Average income per class per month" report={averageIncomePerClass}>
              <AvgIncomePerMonth />
            </Report>
          </Col>
        </Row>
      </Container>
    )
  }

  componentDidMount() {
    this.getReportAverageDaysPerClass();
    this.getReportCurrentlyRentedCarsPerClass();
    this.getReportAverageIncomePerClass();
  }

  async getReportAverageDaysPerClass() {
    let report;
    this.setState((prevState) => ({ averageDaysPerClass: { ...prevState.averageDaysPerClass, loading: true } }))
    await new Promise((res) => setTimeout(res, 1000));
    try {
      report = await axios.get(`${API_ROOT}/reports/class/averageDays`);
      this.setState((prevState) => ({ averageDaysPerClass: { ...prevState.averageDaysPerClass, data: report.data } }))
    } catch (error) {
      console.log(error);
    }
    this.setState((prevState) => ({ averageDaysPerClass: { ...prevState.averageDaysPerClass, loading: false } }))
  }

  async getReportCurrentlyRentedCarsPerClass() {
    let report;
    this.setState((prevState) => ({ currentlyRentedCarsPerClass: { ...prevState.currentlyRentedCarsPerClass, loading: true } }))
    await new Promise((res) => setTimeout(res, 1000));
    try {
      report = await axios.get(`${API_ROOT}/reports/class/currentRentedCars`);
      this.setState((prevState) => ({ currentlyRentedCarsPerClass: { ...prevState.currentlyRentedCarsPerClass, data: report.data } }))
    } catch (error) {
      console.log(error);
    }
    this.setState((prevState) => ({ currentlyRentedCarsPerClass: { ...prevState.currentlyRentedCarsPerClass, loading: false } }))
  }

  async getReportAverageIncomePerClass() {
    let report;
    this.setState((prevState) => ({ averageIncomePerClass: { ...prevState.averageIncomePerClass, loading: true } }))
    await new Promise((res) => setTimeout(res, 1000));
    try {
      report = await axios.get(`${API_ROOT}/reports/class/avgMonthlyIncome?year=2020&month=3`, { year: 2020, month: 3});
      this.setState((prevState) => ({ averageIncomePerClass: { ...prevState.averageIncomePerClass, data: report.data } }))
    } catch (error) {
      console.log(error);
    }
    this.setState((prevState) => ({ averageIncomePerClass: { ...prevState.averageIncomePerClass, loading: false } }))
  }
}
