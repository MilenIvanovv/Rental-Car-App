import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const { onSearch } = props;


  const onSearchDebounced = AwesomeDebouncePromise((text) => text, 1000);

  const onChangeHandler = (e) => {
    setSearchValue(e.target.value);
    onSearchDebounced(e.target.value)
      .then((text) => onSearch(text));
  };

  return (
    <form className="col-12 form-inline mb-3">
      <input className="form-control" data="search" placeholder="Search" value={searchValue} onChange={onChangeHandler} />
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
