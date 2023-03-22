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
  }, []);

  useEffect(() => {
    const filter = planets.filter((planet) => planet.name.includes(inputName));
    setSearchPlanets(filter);
  }, [inputName, planets]);

  useEffect(() => {
    let array = planets;

    if (filterValues.length > 0) {
      array = filterValues.reduce((acc, { tag, condition, number }) => {
        switch (condition) {
        case 'maior que':
          return acc
            .filter((planet) => Number(planet[tag]) > Number(number));

        case 'menor que':
          return acc
            .filter((planet) => Number(planet[tag]) < Number(number));

        default:
          return acc
            .filter((planet) => Number(planet[tag]) === Number(number));
        }
      }, array);
    }

    setSearchPlanets(array);
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
