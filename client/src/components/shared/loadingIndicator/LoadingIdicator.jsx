import React from 'react';
import { Row } from 'react-bootstrap';
import HashLoader from 'react-spinners/HashLoader';
import PropTypes from 'prop-types';

export default function LoadingIdicator(props) {
  const { center } = props;

  return (
    <Row className={`${center ? 'centered' : 'justify-content-center my-5'}`}>
      <HashLoader size={60} color="#007bff" />
    </Row>
  );
}

LoadingIdicator.propTypes = {
  center: PropTypes.bool,
};

LoadingIdicator.defaultProps = {
  center: false,
};
