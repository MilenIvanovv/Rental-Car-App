import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ReportTable(props) {

  const { report } = props;

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

  return (
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
  );
}

ReportTable.propTypes = {
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
