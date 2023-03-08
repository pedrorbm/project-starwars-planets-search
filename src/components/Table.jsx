import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import SearchNameFilter from './SearchNameFilter';
import SearchNumberFilter from './SearchNumberFilter';

function Table() {
  const { titles, searchPlanets } = useContext(MyContext);

  return (
    <div>
      <SearchNameFilter />
      <SearchNumberFilter />
      <table>
        <thead>
          <tr>
            {
              titles.filter((title) => title !== 'residents').map((title, index) => (
                <th key={ index }>{ title.replace('_', ' ') }</th>))
            }
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
