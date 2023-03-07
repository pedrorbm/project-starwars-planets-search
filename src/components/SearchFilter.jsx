import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';

function SearchFilter() {
  const [valueInput, setValueInput] = useState('');

  const { filterName } = useContext(MyContext);

  useEffect(() => {
    filterName(valueInput);
  }, [valueInput]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="search"
        onChange={ ({ target }) => {
          setValueInput(target.value);
        } }
      />
    </div>
  );
}

export default SearchFilter;
