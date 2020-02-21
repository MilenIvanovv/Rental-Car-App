import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const { onSearch } = props;

  return (
    <div className="row justify-content-center">
      <form className="form-inline my-2" onSubmit={(e) => onSearch(e, searchValue)}>
        <input className="form-control mr-sm-2" type="search" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
