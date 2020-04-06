/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from '../../common/sectionHeader/SectionHeader';
import './section.css';

export default function Section(props) {
  const { header } = props;

  return (
    <div className="section-container">
      <SectionHeader text={header} />
      {props.children}
    </div>
  );
}

Section.propTypes = {
  header: PropTypes.string.isRequired,
};
