import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import reports from '../common/reports';
import YearMonthPicker from '../reportResults/yearMonthPicker/YearMonthPicker';
import ReportTable from '../reportTable/ReportTable';
import ReportGraph from '../reportGraph/ReportGraph';
import './report.css';

export default function Report(props) {
  const {
    report,
  } = props;

  const reportData = reports.find((x) => x.reportId === report.reportId);
  const calendar = reportData.monthPicker && <YearMonthPicker report={report} />;
  const reportElement = reportData.graph ? <ReportGraph report={report} /> : <ReportTable report={report} />;
  const body = report.loading ? <h4>Loading...</h4> : reportElement;

  return (
    <Card className="report-card mb-3">
      <Card.Header>{reportData.title}{calendar}</Card.Header>
      <Card.Body>
        {body}
      </Card.Body>
    </Card>
  );
}

Report.propTypes = {
  report: PropTypes.shape({
    reportId: PropTypes.number.isRequired,
    data: PropTypes.shape({
      rows: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        dataType: PropTypes.string.isRequired,
      })),
      columns: PropTypes.arrayOf(PropTypes.shape({
        class: PropTypes.string.isRequired,
        result: PropTypes.arrayOf(PropTypes.number.isRequired),
      })),
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};
