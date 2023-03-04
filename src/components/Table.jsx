import React, { useEffect, useState } from 'react';
import planetsAPI from '../services/planetsAPI';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [titles, setTitles] = useState([]);

  const requisition = async () => {
    const results = await planetsAPI();
    setPlanets(results.results);
    setTitles(Object.keys(results.results[0]));
    console.log(results.results);
  };

  useEffect(() => {
    requisition();
  }, []);

  return (
    <div>
      <table>
        <tr>
          {
            titles.filter((title) => title !== 'residents').map((title, index) => (
              <th key={ index }>{ title.replace('_', ' ') }</th>))
          }
        </tr>
        {
          planets.map((data, index) => (
            <tr key={ index }>
              <td>{ data.name }</td>
              <td>{ data.rotation_period }</td>
              <td>{ data.orbital_period }</td>
              <td>{ data.diameter }</td>
              <td>{ data.climate }</td>
              <td>{ data.gravity }</td>
              <td>{ data.terrain }</td>
              <td>{ data.surface_water }</td>
              <td>{ data.population }</td>
              <td>{ data.films }</td>
              <td>{ data.created }</td>
              <td>{ data.edited }</td>
              <td>{ data.url }</td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}

export default Table;
