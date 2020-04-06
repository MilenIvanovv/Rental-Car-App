import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import reports from '../common/reports';
import './report.css';

export default function Report(props) {
  const {
    report,
  } = props;

  const reportData = reports.find((x) => x.reportId === report.reportId);
  // eslint-disable-next-line react/prop-types
  let { children: resultComp } = props;
  let otherComp;
  if (Array.isArray(resultComp)) {
    // eslint-disable-next-line prefer-destructuring
    resultComp = resultComp[0];
    otherComp = React.Children
      // eslint-disable-next-line react/prop-types
      .map(props.children.slice(1), (child) => React.cloneElement(child, { report }));
  }

  const cardText = report.data && report.data.map((x) => {
    const resultWithProps = React.cloneElement(resultComp, { result: x.result });
    return (
      <span key={x.class} className="align-card-text mb-1">
        <span className="section">
          {/* <span>Class: {x.class}</span> */}
          <span><strong>{x.class}</strong></span>
        </span>
        {resultWithProps}
      </span>
    );
  });

  const rows = report.data.rows.map((x) => <span>{x.name}</span>);

  return (
    <Card className="report-card mb-3">
      <Card.Header>{reportData.title}</Card.Header>
      <Card.Body>
        {otherComp}
        {report.loading
          ? <h4>Loading...</h4>
          : (
            <Card.Text>
              <span className="align-card-text mb-1">
                <span className="section">
                  <span>class</span>
                </span>
                <span className="section">
                  <span>income</span>
                  <span>expenses</span>
                  <span>revenue</span>
                </span>
              </span>
              {
              }
            </Card.Text>
          )}
      </Card.Body>
    </Card>
  );
}

Report.propTypes = {
  report: PropTypes.shape({
    reportId: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      class: PropTypes.string.isRequired,
      rows: PropTypes.any,
    })).isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};
