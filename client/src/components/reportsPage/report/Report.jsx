import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import reports from '../common/reports';
import YearMonthPicker from '../reportResults/yearMonthPicker/YearMonthPicker';
import YearPicker from '../reportResults/yearPicker/YearPicker';
import ReportTable from '../reportTable/ReportTable';
import ReportGraph from '../reportGraph/ReportGraph';
import reportTypes from '../../../common/models/prop-types';
import './report.css';
import LoadingIdicator from '../../shared/loadingIndicator/LoadingIdicator';

export default function Report(props) {
  const {
    report,
  } = props;

  const reportData = reports.find((x) => x.reportId === report.reportId);
  const calendar = reportData.monthPicker && <YearMonthPicker report={report} />;
  const yearPicker = reportData.yearPicker && <YearPicker report={report} />;
  const reportElement = reportData.graph ? <ReportGraph report={report} /> : <ReportTable report={report} />;
  const body = report.loading ? <LoadingIdicator center /> : reportElement;

  return (
    <Card className="report-card mb-3">
      <Card.Header>{reportData.title}{calendar}{yearPicker}</Card.Header>
      <Card.Body>
        {body}
      </Card.Body>
    </Card>
  );
}

Report.propTypes = {
  report: PropTypes.shape(reportTypes).isRequired,
};
