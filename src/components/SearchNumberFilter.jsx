import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchNumberFilter() {
  const [options, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
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
        {
          options.map((e, i) => <option key={ i } value={ e }>{e}</option>)
        }
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
          setOptions(options.filter((e) => e !== values.tag));
        } }
      >
        FILTRAR
      </button>
      {
        filterValues.map((element, index) => (
          <div key={ index } data-testid="filter">
            <span>
              {`${element.tag} ${element.condition} ${element.number}`}
            </span>
            <button
              data-testid="btn-remove"
              type="button"
              onClick={ () => {
                setFilterValues(filterValues.filter((e) => e !== filterValues[index]));
              } }
            >
              EXCLUIR

            </button>
          </div>
        ))
      }
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => { setFilterValues([]); } }
      >
        REMOVER FILTROS
      </button>
    </div>
  );
}

export default SearchNumberFilter;
