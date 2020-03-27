import React, { Component } from 'react'
import { connect } from 'react-redux';
import Report from './Report'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { API_ROOT } from '../../constants/constants';
import { addReport } from '../../actions/addReportAction';
import { modifyReport } from '../../actions/modifyReportAction';
import reports from './common/reports';

class ReportsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }


  render() {

    const transformedReports = this.props.reports.map((report) => {
      const reportData = Object.values(reports).find(x => x.reportId === report.reportId);
      return (
        <Col key={reportData.reportId} xs={4}>
          <Report key={report.reportId } title={reportData.title} report={report}>
            {reportData.children}
          </Report>
        </Col>
      )
    })

    return (
      <Container>
        <Row className="mb-3">
          {transformedReports}
        </Row>
      </Container>
    )
  }

  componentDidMount() {
    const today = new Date();

    this.getReportAverageDaysPerClass();
    this.getReportCurrentlyRentedCarsPerClass();
    this.getReportAverageIncomePerClass(today.getFullYear(), today.getMonth());
  }

  async getReportAverageDaysPerClass() {
    const report = reports.averageDaysPerClass;
    this.props.addReport({
      reportId: report.reportId,
      loading: true,
      data: [],
    })
    await new Promise((res) => setTimeout(res, 1000));
    try {
      const response = await axios.get(`${API_ROOT}/${report.urlRequest}`);
      this.props.modifyReport({ reportId: report.reportId, data: response.data});
    } catch (error) {
      console.log(error);
    }
    this.props.modifyReport({ reportId: report.reportId, loading: false });
  }

  async getReportCurrentlyRentedCarsPerClass() {
    const report = reports.currentlyRentedCarsPerClass;
    this.props.addReport({
      reportId: report.reportId,
      loading: true,
      data: [],
    })
    await new Promise((res) => setTimeout(res, 1000));
    try {
      const response = await axios.get(`${API_ROOT}/${report.urlRequest}`);
      this.props.modifyReport({ reportId: report.reportId, data: response.data});
    } catch (error) {
      console.log(error);
    }
    this.props.modifyReport({ reportId: report.reportId, loading: false });

  }

  async getReportAverageIncomePerClass(year, month) {
    const report = reports.averageIncomePerClass;
    this.props.addReport({
      reportId: report.reportId,
      loading: true,
      data: [],
    })
    await new Promise((res) => setTimeout(res, 1000));
    try {
      const response = await axios.get(`${API_ROOT}/${report.urlRequest}?year=${year}&month=${month}`);
      this.props.modifyReport({ reportId: report.reportId, data: response.data});
    } catch (error) {
      console.log(error);
    }
    this.props.modifyReport({ reportId: report.reportId, loading: false });
  }
}

const mapStateToProps = (state) => ({
  reports: state.reports,
});

const mapActionsToProps = {
  addReport,
  modifyReport,
}

export default connect(mapStateToProps, mapActionsToProps)(ReportsPage);
