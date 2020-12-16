import PropTypes from "prop-types";
import { useContext } from "react";

import PlanetsContext from "../../context";

export default function NumericFilter({ filter }) {
  const { removeNumericFilter } = useContext(PlanetsContext);

  const closeButtonClickHandler = () => {
    removeNumericFilter(filter.column);
  };

  return (
    <div className="filter-card">
      <button onClick={closeButtonClickHandler}>
        X
      </button>

      <div>
        {filter.column}
        &nbsp;
        {filter.comparison}
        &nbsp;
        {filter.value}
      </div>
    </div>
  );
}

NumericFilter.propTypes = {
  filter: PropTypes.shape({
    column: PropTypes.string.isRequired,
    comparison: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
};
