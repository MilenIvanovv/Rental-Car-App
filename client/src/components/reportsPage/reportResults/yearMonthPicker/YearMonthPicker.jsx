import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import PropTypes from 'prop-types';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reports from '../../common/reports';
import { modifyReport } from '../../../../actions/modifyReportAction';
import { API_ROOT } from '../../../../constants/constants';
import './yearMonthPicker.css';
import { reportTypes } from '../../../../common/models/prop-types';

class YearMonthPicker extends Component {
  // eslint-disable-next-line react/sort-comp
  render() {
    const { report } = this.props;

    return (
      <label>
        <div className="calendar-container">
          <DatePicker
            selected={report.date ? new Date(report.date) : new Date()}
            showMonthYearPicker
            showYearDropdown
            dateFormat="MMMM yyyy"
            className="year-month-picker"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={this.getReport.bind(this)}
          // inline
          />
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
      </label>
    );
  }

  async getReport(value) {
    // eslint-disable-next-line no-shadow
    const { report, modifyReport } = this.props;
    const date = new Date(value);
    const reportData = reports.find((x) => x.reportId === report.reportId);
    const id = report.reportId;

    // Change query params
    let url = reportData.urlRequest.split('?');
    url[1] = `year=${date.getFullYear()}&month=${date.getMonth() + 1}`;
    url = url.join('?');

    modifyReport({ reportId: id, loading: true, date });
    try {
      const response = await axios.get(`${API_ROOT}/${url}`);
      modifyReport({ reportId: id, data: response.data });
    } catch (error) {
      console.log(error);
    }
    modifyReport({ reportId: id, loading: false });
  }
}

YearMonthPicker.propTypes = {
  report: PropTypes.shape(reportTypes).isRequired,
  modifyReport: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  modifyReport,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapActionsToProps)(YearMonthPicker);
