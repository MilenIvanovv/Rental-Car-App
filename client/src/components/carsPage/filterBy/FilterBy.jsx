import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './filterBy.css';
import PropTypes from 'prop-types';

export default function FilterBy(props) {
  const { category, actions, select } = props;

  const [selected, setSelected] = useState(actions[0]);

  const allActions = [...actions];
  allActions.unshift('All');

  const options = allActions
    .map((action) => <Dropdown.Item key={action} onClick={() => (setSelected(action), select(action === 'All' ? null : action))}>{action}</Dropdown.Item>);

  return (
    <Dropdown className="filter-container">
      <span className="category">{category}:</span>
      <Dropdown.Toggle id="dropdown-basic">
        {selected || allActions[0]}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options}
      </Dropdown.Menu>
    </Dropdown>
  );
}

FilterBy.propTypes = {
  category: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  select: PropTypes.func.isRequired,
};
