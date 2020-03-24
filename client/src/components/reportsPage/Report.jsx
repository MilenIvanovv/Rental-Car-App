import React from 'react'
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './report.css'

export default function Report(props) {

  const { report } = props;


  return (
    <Card
      style={{ width: '18rem' }}
    >
      <Card.Header>Average days per class</Card.Header>
      <Card.Body>
        <Card.Text className="align-card-text">
            <span className="section w-50">
              {report.map((x) => <span key={x.class}>Class: {x.class}</span>)}
            </span>
            <span className="section">
              {report.map((x) => <span key={x.class}>Class: {x.averageDays || 0}</span>)}
            </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}


Report.propTypes = {
  report: PropTypes.arrayOf(PropTypes.shape({
    class: PropTypes.string.isRequired,
    averageDays: PropTypes.number,
  })),
};

Report.defaultProps = {
  averageDays: null,
};