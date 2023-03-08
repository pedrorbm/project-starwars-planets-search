import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchNumberFilter() {
  const [values, setValues] = useState({
    tag: 'population',
    condition: 'maior que',
    number: 0,
  });

  const { filterValues, setFilterValues } = useContext(MyContext);

  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setValues({ ...values, tag: target.value }) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setValues({ ...values, condition: target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ values.number }
        onChange={ ({ target }) => setValues({ ...values, number: target.value }) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          setFilterValues([...filterValues, values]);
        } }
      >
        FILTRAR
      </button>
      {
        filterValues.map((element, index) => (
          <span key={ index }>
            {`${element.tag} ${element.condition} ${element.number}`}
          </span>
        ))
      }
    </div>
  );
}

export default SearchNumberFilter;
