import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const { onSearch } = props;

  const onChangeHandler = (e) => {
    onSearch(e, e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <form className="col-12 form-inline mb-3">
      <input className="form-control" type="search" data="search" placeholder="Search" value={searchValue} onChange={onChangeHandler} />
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
