import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import Report from './report/Report';
import { API_ROOT } from '../../constants/constants';
import { modifyReport } from '../../actions/modifyReportAction';
import Section from '../shared/section/Section';
import reports from './common/reports';

class ReportsPage extends Component {
  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);

    this.state = {
      pageReports: [],
    };
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { pageReports } = this.state;

    const transformedReports = this.props.reports
      .filter((r) => pageReports.includes(r.reportId))
      .map((report) => {
        return (
          <Col key={report.reportId} xs={12}>
            <Report report={report} getReport={this.getReport.bind(this)} />
          </Col>
        );
      });

    return (
      <Container>
        <Section header="Reports">
          <Row className="mb-3">
            {transformedReports}
          </Row>
        </Section>
      </Container>
    );
  }

  componentDidMount() {
    this.loadReports();
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.reportFilter !== this.props.reportFilter) {
      this.loadReports();
    }
  }

  loadReports() {
    const { reportFilter } = this.props;

    const pageReports = reports
      .filter(reportFilter)
      .map((r) => {
        this.getReport(r);
        return r.reportId;
      });

    this.setState({ pageReports });
  }

  async getReport(report) {
    // eslint-disable-next-line no-shadow
    const { modifyReport } = this.props;
    modifyReport({ reportId: report.reportId, loading: true });
    try {
      const response = await axios.get(`${API_ROOT}/${report.urlRequest}`);
      modifyReport({ reportId: report.reportId, data: response.data });
    } catch (error) {
      console.log(error);
    }
    modifyReport({ reportId: report.reportId, loading: false });
  }
}

ReportsPage.propTypes = {
  modifyReport: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.shape({
    reportId: PropTypes.number.isRequired,
    data: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
  })).isRequired,
  reportFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reports: state.reports,
});

const mapActionsToProps = {
  modifyReport,
};

export default connect(mapStateToProps, mapActionsToProps)(ReportsPage);
