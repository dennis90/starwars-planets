import { useContext, useState } from "react";

import PlanetsContext from "../context";
import NumericFilter from "./NumericFilter";

export const numericFields = [
  "diameter",
  "orbital_period",
  "population",
  "rotation_period",
  "surface_water",
];

export const FilterTypes = {
  equal: "EQUAL",
  greaterThan: "GREATER_THAN",
  greaterThanOrEqual: "GREATER_THAN_OR_EQUAL",
  lessThan: "LESS_THAN",
  lessThanOrEqual: "LESS_THAN_OR_EQUAL",
};


export default function Filters() {
  const { filters, setNameFilter, appendNumericFilter } = useContext(PlanetsContext);

  const usedNumericFilters = filters.filterByNumericValues.map((filter) => filter.column);
  const cleanedNumericFields = numericFields.filter((field) => !usedNumericFilters.includes(field));

  const [numericFilter, setNumericFilter] = useState({
    column: "",
    comparison: "",
    value: "",
  });

  const appendFilterSubmitHandler = (event) => {
    event.preventDefault();

    appendNumericFilter(numericFilter);
    setNumericFilter({
      column: "",
      comparison: "",
      value: "",
    });
  };

  return (
    <div>
      <div>
        <div>
          <label htmlFor="name-filter">
            Name filter
          </label>

          <input
            id="name-filter"
            type="text"
            value={filters.filterByName.name}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>

        <form onSubmit={appendFilterSubmitHandler}>
          <label htmlFor="numeric-filters">
            Numeric filters
          </label>

          <select
            id="numeric-filters"
            value={numericFilter.column}
            onChange={(e) => setNumericFilter({ ...numericFilter, column: e.target.value })}
            required={true}
          >
            <option value=""></option>
            {cleanedNumericFields.map((field) =>
              <option key={field} value={field}>{field}</option>
            )}
          </select>

          <label htmlFor="numeric-filter-comparison">
            Filter
          </label>

          <select
            id="numeric-filter-comparison"
            value={numericFilter.comparison}
            onChange={(e) => setNumericFilter({ ...numericFilter, comparison: e.target.value })}
            required={true}
          >
            <option value=""></option>

            <option value={FilterTypes.greaterThan}>
              Greater than
            </option>

            <option value={FilterTypes.greaterThanOrEqual}>
              Greater than or equal
            </option>

            <option value={FilterTypes.lessThan}>
              Less than
            </option>

            <option value={FilterTypes.lessThanOrEqual}>
              Less than or equal
            </option>

            <option value={FilterTypes.equal}>
              Equal
            </option>
          </select>

          <label htmlFor="numeric-filter-value">
            Value
          </label>

          <input
            type="text"
            id="numeric-filter-value"
            value={numericFilter.value}
            onChange={(e) => setNumericFilter({ ...numericFilter, value: e.target.value })}
            required={true}
          />

          <button type="submit">
            Add
          </button>
        </form>
      </div>

      <div>
        {filters.filterByNumericValues.map((numericFilter, index) => {
          return <NumericFilter filter={numericFilter} key={index}/>;
        })}
      </div>
    </div>
  );
}
