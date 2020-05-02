/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
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
      isActive: null,
      isDropped: false,
    };

    this.clickDropHandler = this.clickDropHandler.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  cardDropdown({ reportTitle, calendar, yearPicker, isLoading, report, reportElement }) {
    const { isActive } = this.state;
    const icon = isLoading
      ? <div className="loading-container"><LoadingIdicator center color="white" size={30} /></div>
      : <FontAwesomeIcon className="drop-icon" icon={faChevronCircleDown} size="1x" />;

    return (
      <Card className="report-card mb-3">
        <Card.Header className="cursor-pointer" onClick={() => this.clickDropHandler(report)}>
          <span>{reportTitle}</span>
          <div className="d-flex">
            <div onClick={(ev) => ev.stopPropagation()}>
              <div>
                {calendar}
                {yearPicker}
              </div>
            </div>
            {icon}
          </div>
        </Card.Header>
        <div className={`card-body-container ${isActive !== null && (isActive ? 'active' : 'report-collapse')}`} onAnimationEnd={(ev) => this.onDropEnd(ev)} >
          <Card.Body>
            {reportElement}
          </Card.Body>
        </div>
      </Card>
    );
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    const { isDropped, isActive } = this.state;
    const { reportData, reports } = this.props;

    const report = reports.find((x) => x.reportId === reportData.reportId);

    if (!report) {
      return this.cardDropdown({ reportTitle: reportData.title, report: reportData });
    }

    const calendar = isActive && reportData.monthPicker && <YearMonthPicker report={report} />;
    const yearPicker = isActive && reportData.yearPicker && <YearPicker report={report} />;
    const reportElement = reportData.graph ? <ReportGraph report={report} isActive={isDropped} /> : <ReportTable report={report} />;
    const data = isDropped ? reportElement : undefined;
    const isLoading = report.loading;

    return this.cardDropdown({ reportTitle: reportData.title, calendar, yearPicker, isLoading, report: reportData, reportElement: data });
  }

  async getReport(report) {
    // eslint-disable-next-line no-shadow
    const { modifyReport } = this.props;
    modifyReport({ reportId: report.reportId, loading: true });
    try {
      const response = await axios.get(`${API_ROOT}/${report.urlRequest}`);
      modifyReport({ reportId: report.reportId, data: response.data });
    } catch (error) {
      toastr.error('Failed getting report', report.title);
    }
    modifyReport({ reportId: report.reportId, loading: false });
  }

  // eslint-disable-next-line class-methods-use-this
  async clickDropHandler(reportData) {
    const { reports } = this.props;
    const report = reports.find((x) => x.reportId === reportData.reportId);

    if (!report) {
      await this.getReport(reportData);
    }

    this.setState((prevState) => ({ isActive: !prevState.isActive, isDropped: true }));
  }

  onDropEnd(ev) {
    if (ev.animationName === 'collapse') {
      this.setState({ isDropped: false });
    }
  }

  onDropStart(ev) {
    if (ev.animationName === 'drop') {
      this.setState({ isDropped: true });
    }
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
