import React from "react";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function YearInput({ value, openPanel, selected, clear }) {
  const selectedClass = selected ? "imput-wrapper-selected" : "";

  function clearHandler(e) {
    clear();
  }

  return (
    <div className={`input-wrapper ${selectedClass}`}>
      <input
        className="year-input"
        value={value}
        onClick={openPanel}
        placeholder="Select"
        readOnly
      />
      <FontAwesomeIcon icon={faCalendarAlt} />
      {/* <i
        name="calendar"
        className="input-icon input-icon-close fa fa-times"
        onClick={clearHandler}
      /> */}
    </div>
  );
}

export default YearInput;
