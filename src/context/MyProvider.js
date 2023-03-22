import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import planetsAPI from '../services/planetsAPI';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanets, setSearchPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    const requisition = async () => {
      const results = await planetsAPI();
      setPlanets(results.results);
    };
    requisition();
  }, [planets]);

  useEffect(() => {
    const filter = planets.filter((planet) => planet.name.includes(inputName));
    setSearchPlanets(filter);
  }, [inputName, planets]);

  useEffect(() => {
    let array = planets;
    console.log(planets);
    console.log(filterValues);

    if (filterValues.length > 0) {
      array = filterValues.reduce((acc, { tag, condition, number }) => {
        switch (condition) {
        case 'maior que':
          return acc
            .filter((planet) => Number(planet[tag]) > Number(number));

        case 'menor que':
          return acc
            .filter((planet) => Number(planet[tag]) < Number(number));

        case 'igual a':
          return acc
            .filter((planet) => Number(planet[tag]) === Number(number));

        default:
          break;
        }
        return array;
      }, array);
    }

    setSearchPlanets(array);
    console.log('array:', array);
    console.log('search planets:', searchPlanets);
  }, [filterValues, planets]);

  const state = useMemo(() => ({
    planets,
    setPlanets,
    searchPlanets,
    setInputName,
    filterValues,
    setFilterValues,
  }), [planets, searchPlanets, filterValues]);

  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
