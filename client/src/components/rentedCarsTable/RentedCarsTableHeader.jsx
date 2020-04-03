import React from 'react';
import PropTypes from 'prop-types';
import './rentedCarsTable.css';

export default function RentedCarsTableHeader(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const colums = props.colums.map((colum) => <th key={colum}>{colum}</th>);

  return (
    <tr>
      {colums}
    </tr>
  );
}

RentedCarsTableHeader.propTypes = {
  colums: PropTypes.arrayOf(PropTypes.string).isRequired,
};
