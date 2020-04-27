/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { connect } from 'react-redux';
import YearMonthPicker from '../reportResults/yearMonthPicker/YearMonthPicker';
import YearPicker from '../reportResults/yearPicker/YearPicker';
import ReportTable from '../reportTable/ReportTable';
import ReportGraph from '../reportGraph/ReportGraph';
import reportTypes from '../../../common/models/prop-types';
import './report.css';
import LoadingIdicator from '../../shared/loadingIndicator/LoadingIdicator';
import { API_ROOT } from '../../../constants/constants';
import { modifyReport } from '../../../actions/modifyReportAction';

class Report extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.clickDropHandler = this.clickDropHandler.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  cardDropdown({ reportTitle, calendar, yearPicker, data, report }) {
    return (
      <Card className="report-card mb-3">
        <Card.Header>
          <span onClick={() => this.clickDropHandler(report)} >{reportTitle}</span>
          <div className="d-flex">
            {calendar}
            {yearPicker}
            <FontAwesomeIcon className="drop-icon" icon={faChevronCircleDown} size="1x" onClick={() => this.clickDropHandler(report)} />
          </div>
        </Card.Header>
        {data}
      </Card>
    );
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    const { isActive } = this.state;
    const { reportData, reports } = this.props;

    const report = reports.find((x) => x.reportId === reportData.reportId);

    if (!report) {
      return this.cardDropdown({ reportTitle: reportData.title, report: reportData });
    }

    const calendar = isActive && reportData.monthPicker && <YearMonthPicker report={report} />;
    const yearPicker = isActive && reportData.yearPicker && <YearPicker report={report} />;
    const reportElement = reportData.graph ? <ReportGraph report={report} /> : <ReportTable report={report} />;
    const body = report.loading ? <LoadingIdicator center /> : reportElement;
    const data = isActive ? <Card.Body className="report-card-body"> {body} </Card.Body> : undefined;

    return this.cardDropdown({ reportTitle: reportData.title, calendar, yearPicker, data, report: reportData });
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

  // eslint-disable-next-line class-methods-use-this
  clickDropHandler(reportData) {
    const { reports } = this.props;
    const report = reports.find((x) => x.reportId === reportData.reportId);

    if (!report) {
      this.getReport(reportData);
    }

    this.setState((prevState) => ({ isActive: !prevState.isActive }));
  }
}

Report.propTypes = {
  modifyReport: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.shape(reportTypes)).isRequired,
  reportData: PropTypes.shape(reportTypes).isRequired,
};

const mapStateToProps = (state) => ({
  reports: state.reports,
});

const mapActionsToProps = {
  modifyReport,
};

export default connect(mapStateToProps, mapActionsToProps)(Report);
