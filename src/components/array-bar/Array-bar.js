import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ArrayBarWrapper from "./Array-bar.style";

export const ArrayBar = ({ height, active, compare, sorted, min }) => {
  return (
    <div>
      <ArrayBarWrapper
        h={height}
        act={active}
        comp={compare}
        sort={sorted}
        mn={min}
      >
        <div className="array-bar"></div>
      </ArrayBarWrapper>
    </div>
  );
};

export default ArrayBar;
