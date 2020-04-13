import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './filterBy.css';
import PropTypes from 'prop-types';

export default function FilterBy(props) {
  const { category, actions, select } = props;

  const [selected, setSelected] = useState(actions[0]);

  const options = actions
    .map((action) => <Dropdown.Item onClick={() => (setSelected(action), select(action))}>{action}</Dropdown.Item>);

  return (
    <Dropdown className="filter-container">
      <span className="category">{category}:</span>
      <Dropdown.Toggle id="dropdown-basic">
        {selected || actions[0]}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options}
      </Dropdown.Menu>
    </Dropdown>
  );
}

FilterBy.propTypes = {
  category: PropTypes.string.isRequired,
};
