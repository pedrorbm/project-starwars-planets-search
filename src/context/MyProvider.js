import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import planetsAPI from '../services/planetsAPI';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [titles, setTitles] = useState([]);
  const [searchPlanets, setSearchPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    const requisition = async () => {
      const results = await planetsAPI();
      setPlanets(results.results);
      setTitles(Object.keys(results.results[0]));
    };
    requisition();
  }, [planets]);

  useEffect(() => {
    const filter = planets.filter((planet) => planet.name.includes(inputName));
    setSearchPlanets(filter);
  }, [inputName, planets]);

  useEffect(() => {
    filterValues.map(({ tag, condition, number }) => {
      switch (condition) {
      case 'maior que':
        return setSearchPlanets(searchPlanets
          .filter((planet) => Number(planet[tag]) > Number(number)));

      case 'menor que':
        return setSearchPlanets(searchPlanets
          .filter((planet) => Number(planet[tag]) < Number(number)));

      case 'igual a':
        return setSearchPlanets(searchPlanets
          .filter((planet) => Number(planet[tag]) === Number(number)));

      default:
        break;
      }
      return planets;
    });
  }, [searchPlanets, filterValues, planets]);

  const state = useMemo(() => ({
    planets,
    setPlanets,
    titles,
    searchPlanets,
    setInputName,
    filterValues,
    setFilterValues,
  }), [planets, titles, searchPlanets, filterValues]);

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
