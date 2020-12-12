import React from "react";

export default React.createContext({
  appendNumericFilter: () => {},
  data: [],
  filters: {
    filterByName: { name: "" },
    filterByNumericValues: [],
  },
  removeNumericFilter: () => {},
  setNameFilter: () => {},
});
