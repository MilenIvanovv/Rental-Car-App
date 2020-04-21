import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { reportTypes } from '../../../common/models/prop-types';

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
  report: PropTypes.shape(reportTypes).isRequired,
};
