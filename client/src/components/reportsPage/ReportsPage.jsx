import React, { Component } from 'react'
import Report from './Report'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { API_ROOT } from '../../constants/constants';



export default class ReportsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      averageDaysPerClass: [],
      loadingReports: false,
    };
  }

  componentDidMount() {
    this.getReportAverageDaysPerClass();
  }

  async getReportAverageDaysPerClass() {
    let report;
    this.setState({ loadingReports: true })
    try {
      report = await axios.get(`${API_ROOT}/reports/class/averageDays`);
      this.setState({ averageDaysPerClass: report.data })
    } catch (error) {
      console.log(error);
    }
    this.setState({ loadingReports: false })
  }

  render() {
    return (
      <Container>
        <Row className="mb-3">
          <Col>
            <Report report={this.state.averageDaysPerClass} loading={this.state.loadingReports}/>
          </Col>
        </Row>
      </Container>
    )
  }
}
