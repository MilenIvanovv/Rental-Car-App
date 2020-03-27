import React, { Component } from 'react';
import { connect } from 'react-redux';
import reports from '../common/reports';
import DatePicker from 'react-datepicker';
import { modifyReport } from '../../../actions/modifyReportAction';
import axios from 'axios';
import { API_ROOT } from '../../../constants/constants';

class YearMonthPicker extends Component {

  render() {
    const date = this.props.report.date;

    return (
      <DatePicker 
      selected={date ? new Date(date) : new Date()} 
      showMonthYearPicker
      onChange={this.getReportAverageIncomePerClass.bind(this)} 
      inline
  />
    )
  }

  async getReportAverageIncomePerClass(value) {
    const date = new Date(value);
    const report = reports.averageIncomePerClass;
    const id = reports.averageIncomePerClass.reportId;
    this.props.modifyReport({ reportId: id, loading: true, date});
    await new Promise((res) => setTimeout(res, 1000));
    try {
      const response = await axios.get(`${API_ROOT}/${report.urlRequest}?year=${date.getFullYear()}&month=${date.getMonth()}`);
      this.props.modifyReport({ reportId: id, data: response.data});
    } catch (error) {
      console.log(error);
    }
    this.props.modifyReport({ reportId: id, loading: false });
  }
}

const mapActionsToProps = {
  modifyReport,
}

const mapStateToProps = (state) => ({
  report: state.reports.find((x) => x.reportId === reports.averageIncomePerClass.reportId),
})

export default connect(mapStateToProps, mapActionsToProps)(YearMonthPicker)
