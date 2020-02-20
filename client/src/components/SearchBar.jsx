import React, { useState } from 'react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="row justify-content-center">
      <form className="form-inline my-2">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  );
}
