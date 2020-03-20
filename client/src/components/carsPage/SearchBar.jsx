import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const { onSearch } = props;

  const onChangeHandler = (e) => {
     onSearch(e, e.target.value);
     setSearchValue(e.target.value);
  }

  return (
    <Row className="justify-content-center" >
      <form className="form-inline my-2">
        <input className="form-control mr-sm-2" type="search" data="search" placeholder="Search" value={searchValue} onChange={onChangeHandler} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </Row>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
