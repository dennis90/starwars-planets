import PropTypes from "prop-types";
import { useContext } from "react";

import PlanetsContext from "../../context";

export default function NumericFilter({ filter }) {
  const { removeNumericFilter } = useContext(PlanetsContext);

  const closeButtonClickHandler = () => {
    removeNumericFilter(filter.column);
  };

  return (
    <div>
      <button onClick={closeButtonClickHandler}>
        X
      </button>

      <ul>
        <li>{filter.column}</li>
        <li>{filter.comparison}</li>
        <li>{filter.value}</li>
      </ul>
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
