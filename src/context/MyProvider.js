import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import planetsAPI from '../services/planetsAPI';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [titles, setTitles] = useState([]);
  const [namePlanet, setNamePlanet] = useState([]);

  const requisition = async () => {
    const results = await planetsAPI();
    setPlanets(results.results);
    setTitles(Object.keys(results.results[0]));
  };

  const filterName = async (value) => {
    const results = await planetsAPI();
    const filter = results.results.filter((planet) => planet.name.includes(value));
    setPlanets(filter);
  };

  const state = useMemo(() => ({
    planets, setPlanets, namePlanet, setNamePlanet, titles, requisition, filterName,
  }), [planets, titles, namePlanet]);

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
