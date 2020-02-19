import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="row justify-content-center align-items-center mt-3">
      <input type="text" placeholder="type model to search" className="mr-2" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
    </div>
  )
}
