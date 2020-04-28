import React from 'react';
import { Row } from 'react-bootstrap';
import HashLoader from 'react-spinners/HashLoader';
import PropTypes from 'prop-types';

export default function LoadingIdicator(props) {
  const { center, color, size } = props;

  return (
    <Row className={`${center ? 'centered' : 'justify-content-center my-5'}`}>
      <HashLoader size={size || 60} color={color || '#007bff'} />
    </Row>
  );
}

LoadingIdicator.propTypes = {
  center: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
};

LoadingIdicator.defaultProps = {
  center: false,
  color: undefined,
  size: undefined,
};
