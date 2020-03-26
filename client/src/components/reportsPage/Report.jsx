import React from 'react'
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './report.css'

export default function Report(props) {

  const {
    report,
    title
  } = props;

  const cardText = report.data && report.data.map((x) => {
    const resultWithProps = React.Children
      .map(props.children, child => React.cloneElement(child, { result: x.result }));

    return (
      <span key={x.class} className="align-card-text">
        <span className="section">
          <span >Class: {x.class}</span>
        </span>
        {resultWithProps}
      </span>
    );
  })

  return (
    <Card className="report-card">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        {report.loading
          ? <h4>Loading...</h4>
          : <Card.Text>
            {cardText}
          </Card.Text>}
      </Card.Body>
    </Card>
  )
}

Report.propTypes = {
  report: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      class: PropTypes.string.isRequired,
      result: PropTypes.number,
    })),
    loading: PropTypes.bool.isRequired,
  })
};

Report.defaultProps = {
  result: null,
};