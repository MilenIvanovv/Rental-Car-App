import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import PropTypes from 'prop-types';
import reports from '../../common/reports';
import { modifyReport } from '../../../../actions/modifyReportAction';
import { API_ROOT } from '../../../../constants/constants';
import './yearMonthPicker.css';

class YearMonthPicker extends Component {
  // eslint-disable-next-line react/sort-comp
  render() {
    const { report } = this.props;

    return (
      <div className="calendar-container">
        <DatePicker
          selected={report.date ? new Date(report.date) : new Date()}
          showMonthYearPicker
          // eslint-disable-next-line react/jsx-no-bind
          onChange={this.getReportAverageIncomePerClass.bind(this)}
          inline
        />
      </div>
    );
  }

  async getReportAverageIncomePerClass(value) {
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
  report: PropTypes.shape({
    reportId: PropTypes.number.isRequired,
    data: PropTypes.any.isRequired,
    loading: PropTypes.bool.isRequired,
    date: PropTypes.string,
  }).isRequired,
  modifyReport: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  modifyReport,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapActionsToProps)(YearMonthPicker);
