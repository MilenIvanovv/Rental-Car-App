import React from 'react';
import PropTypes from 'prop-types';
import './sectionHeader.css';

export default function SectionHeader(props) {
  const { text } = props;

  return (
    <h3 className="section-header">{text}</h3>
  );
}

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired,
};
