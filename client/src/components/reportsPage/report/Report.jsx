import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import reports from '../common/reports';
import YearMonthPicker from '../reportResults/yearMonthPicker/YearMonthPicker';
import './report.css';

export default function Report(props) {
  const {
    report,
  } = props;

  const reportData = reports.find((x) => x.reportId === report.reportId);
  // eslint-disable-next-line react/prop-types

  const columns = report.data.columns && report.data.columns.map((col) => {
    const { rows } = report.data;

    return (
      <span key={col.class} className="align-card-text mb-1">
        <span className="section">
          <span><strong>{col.class}</strong></span>
        </span>
        <span className="section">
          {col.result.map((x, i) => <span key={i} className="price">{x}{rows[i].dataType}</span>)}
        </span>
      </span>
    );
  });

  const rows = report.data.rows && report.data.rows.map((x, index) => <span key={index}>{x.name}</span>);

  const calendar = reportData.monthPicker && <YearMonthPicker report={report} />;

  return (
    <Card className="report-card mb-3">
      <Card.Header>{reportData.title}{calendar}</Card.Header>
      <Card.Body>
        {report.loading
          ? <h4>Loading...</h4>
          : (
            <Card.Text>
              <span className="align-card-text mb-1">
                <span className="section">
                  <span>class</span>
                </span>
                <span className="section">
                  {rows}
                </span>
              </span>
              {columns}
            </Card.Text>
          )}
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
