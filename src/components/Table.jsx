import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import SearchNameFilter from './SearchNameFilter';
import SearchNumberFilter from './SearchNumberFilter';

function Table() {
  const { searchPlanets } = useContext(MyContext);

  return (
    <div>
      <SearchNameFilter />
      <SearchNumberFilter />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {
          searchPlanets?.map((data, index) => (
            <tbody key={ index }>
              <tr>
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
            </tbody>
          ))
        }
      </table>
    </div>
  );
}

export default Table;
