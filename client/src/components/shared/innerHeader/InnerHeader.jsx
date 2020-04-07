import React from 'react';
import PropTypes from 'prop-types'
import './innerHeader.css';

export default function InnerHeader(props) {
  const { text } = props;

  return (
    <div className="inner-header">
      <h5>{text}</h5>
    </div>
  );
}

InnerHeader.propTypes = {
  text: PropTypes.string.isRequired,
}
