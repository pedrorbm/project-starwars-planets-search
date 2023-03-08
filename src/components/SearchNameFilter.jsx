import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchFilter() {
  const { setInputName } = useContext(MyContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="search"
        onChange={ ({ target }) => { setInputName(target.value); } }
      />
    </div>
  );
}

export default SearchFilter;
