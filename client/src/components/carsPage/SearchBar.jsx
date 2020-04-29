import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { debounce } from '../../utils/debounce';

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const [fn, setFn] = useState();
  const { onSearch } = props;

  let debouncedFn;

  const onChangeHandler = (e) => {
    /* signal to React not to nullify the event object */
    e.persist();

    if (!fn) {
      const debouncedSearch = debounce(onSearch, 400);
      setFn(() => debouncedSearch);
      debouncedSearch(e.target.value);
    } else {
      fn(e.target.value);
    }

    setSearchValue(e.target.value);
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
