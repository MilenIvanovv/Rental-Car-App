import React, { Component } from 'react'
import { connect } from 'react-redux';
import Report from './Report'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { API_ROOT } from '../../constants/constants';
import { modifyReport } from '../../actions/modifyReportAction';
import reports from './common/reports';

class ReportsPage extends Component {

  render() {
      const transformedReports = this.props.reports.map((report) => {
      const reportData = reports.find(x => x.reportId === report.reportId);
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
    reports.forEach(this.getReport.bind(this));
  }

  async getReport(report) {
    this.props.modifyReport({ reportId: report.reportId, loading: true})
    try {
      const response = await axios.get(`${API_ROOT}/${report.urlRequest}`);
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
  modifyReport,
}

export default connect(mapStateToProps, mapActionsToProps)(ReportsPage);
