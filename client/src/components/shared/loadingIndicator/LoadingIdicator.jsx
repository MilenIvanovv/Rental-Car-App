import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';


export default function LoadingIdicator(props) {
  const { text } = props;

  return (
    <Row className="justify-content-center">
      <h1>Loading {text}...</h1>
    </Row>
  );
}

LoadingIdicator.propTypes = {
  text: PropTypes.string.isRequired,
};
