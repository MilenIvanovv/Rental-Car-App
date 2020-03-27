import React from 'react'
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import './report.css';

export default function Report(props) {

  const {
    report,
    title
  } = props;

  let resultComp = props.children;
  let calendar;
  if (Array.isArray(resultComp)) {
    resultComp = props.children[0];
    calendar = props.children[1];
  }

  const cardText = report.data && report.data.map((x) => {
    const resultWithProps = React.cloneElement(resultComp, { result: x.result });
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
        {calendar}
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