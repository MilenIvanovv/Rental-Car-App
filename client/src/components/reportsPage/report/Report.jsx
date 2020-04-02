import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './report.css';

export default function Report(props) {
  const {
    report,
    title,
  } = props;

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
          <span>Class: {x.class}</span>
        </span>
        {resultWithProps}
      </span>
    );
  });

  return (
    <Card className="report-card mb-3">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        {otherComp}
        {report.loading
          ? <h4>Loading...</h4>
          : (
            <Card.Text>
              {cardText}
            </Card.Text>
          )}
      </Card.Body>
    </Card>
  );
}

Report.propTypes = {
  report: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      class: PropTypes.string.isRequired,
      result: PropTypes.any,
    })).isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
