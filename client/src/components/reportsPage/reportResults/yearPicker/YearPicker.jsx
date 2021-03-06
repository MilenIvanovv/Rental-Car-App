import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';
import reports from '../../common/reports';
import { modifyReport } from '../../../../actions/modifyReportAction';
import { API_ROOT } from '../../../../constants/constants';
import YearPickerComp from "../../../../utils/react-year-picker/src/index";
import './yearPicker.css';
import { reportTypes } from '../../../../common/models/prop-types';

class YearPicker extends Component {
  // eslint-disable-next-line react/sort-comp
  render() {
    const { report } = this.props;
    const reportDate = report.date && report.date.getFullYear();

    return (
      <label onClick={(ev) => ev.preventDefault()}>
        <YearPickerComp onChange={this.getReport.bind(this)} selectedYear={reportDate || new Date().getFullYear()} />
      </label>
    );
  }

  async getReport(value) {
    // eslint-disable-next-line no-shadow
    const { report, modifyReport } = this.props;
    const date = new Date(value, 0);
    const reportData = reports.find((x) => x.reportId === report.reportId);
    const id = report.reportId;

    // Change query params
    let url = reportData.urlRequest.split('?');
    url[1] = url[1].replace(/(\d\d\d\d)/g, value);
    url = url.join('?');

    modifyReport({ reportId: id, loading: true, date });
    try {
      const response = await axios.get(`${API_ROOT}/${url}`);
      modifyReport({ reportId: id, data: response.data });
    } catch (error) {
      toastr.error('Failed getting report', reportData.title);
    }
    modifyReport({ reportId: id, loading: false });
  }
}

YearPicker.propTypes = {
  report: PropTypes.shape(reportTypes).isRequired,
  modifyReport: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  modifyReport,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapActionsToProps)(YearPicker);
