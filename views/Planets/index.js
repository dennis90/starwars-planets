import { useCallback, useEffect, useState } from "react";

import Filters, { FilterTypes } from "./Filters";
import Table from "./Table";
import PlanetsContext from "./context";
import { fetchPlanets } from "../../fetchers";

export default function Planets() {
  const [responseData, setResponseData] = useState([]);
  const [providerState, setProviderState] = useState({
    data: [],
    filters: {
      filterByName: { name: "" },
      filterByNumericValues: [],
    },
  });

  const filterByNumber = (value, comparison, filterValue) => {
    try {
      const numberValue = Number.parseInt(value, 10);
      const filterNumberValue = Number.parseInt(filterValue, 10);

      if (comparison === FilterTypes.greaterThan) {
        return numberValue > filterNumberValue;
      } else if (comparison === FilterTypes.greaterThanOrEqual) {
        return numberValue >= filterNumberValue;
      } else if (comparison === FilterTypes.lessThan) {
        return numberValue < filterNumberValue;
      } else if (comparison === FilterTypes.lessThanOrEqual) {
        return numberValue <= filterNumberValue;
      }

      return numberValue === filterNumberValue;
    } catch {
      return false;
    }
  };

  const getFilteredData = (filters) => {
    return responseData
      .filter(({ name }) => {
        return name.toLowerCase().includes(filters.filterByName.name);
      }).filter((planet) => {
        return filters.filterByNumericValues.every((filter) => {
          return filterByNumber(planet[filter.column], filter.comparison, filter.value);
        });
      });
  };

  useEffect(() => {
    fetchPlanets()
      .then(response => response.json())
      .then((response) => {
        setResponseData(response.results);
        setProviderState({
          ...providerState,
          data: response.results,
        });
      });
  }, []);

  const appendNumericFilter = useCallback((filter) => {
    const filterByNumericValues = [...providerState.filters.filterByNumericValues];
    filterByNumericValues.push(filter);

    const filters = {
      ...providerState.filters,
      filterByNumericValues,
    };

    setProviderState({
      ...providerState,
      data: getFilteredData(filters),
      filters,
    });
  }, [providerState]);

  const removeNumericFilter = useCallback((columnToRemove) => {
    const numericFilters = providerState.filters.filterByNumericValues.filter(({ column }) => column !== columnToRemove);
    const filters = {
      ...providerState.filters,
      filterByNumericValues: numericFilters,
    };

    setProviderState({
      ...providerState,
      data: getFilteredData(filters),
      filters,
    });
  }, [providerState]);

  const setNameFilter = useCallback((name) => {
    const filters = {
      ...providerState.filters,
      filterByName: { name }
    };

    setProviderState({
      ...providerState,
      data: getFilteredData(filters),
      filters,
    });

  }, [providerState]);

  return (
    <PlanetsContext.Provider value={{
      ...providerState,
      appendNumericFilter,
      removeNumericFilter,
      setNameFilter,
    }}>
      <Filters/>
      <Table/>
    </PlanetsContext.Provider>
  );
}
