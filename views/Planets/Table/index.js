import { useContext } from "react";

import PlanetsContext from "../context";

export default function Table() {
  const { data } = useContext(PlanetsContext);

  return (
    <div className="planets-table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name}>
              <td>
                {row.name}
              </td>

              <td>
                {row.rotation_period}
              </td>

              <td>
                {row.orbital_period}
              </td>

              <td>
                {row.diameter}
              </td>

              <td>
                {row.climate}
              </td>

              <td>
                {row.gravity}
              </td>

              <td>
                {row.terrain}
              </td>

              <td>
                {row.surface_water}
              </td>

              <td>
                {row.population}
              </td>

              <td>
                {row.films}
              </td>

              <td>
                {row.created}
              </td>

              <td>
                {row.edited}
              </td>

              <td>
                {row.url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
