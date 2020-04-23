import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';

export default function NotFound(props) {
  const { text } = props;

  return (
    <Row className="centered">
      <div className="text-center">
        <h1 className="mb-3">{text}</h1>
        <FontAwesomeIcon icon={faWalking} size="5x" color="#007bff" />
      </div>
    </Row>
  );
}

NotFound.propTypes = {
  text: PropTypes.string.isRequired,
};
