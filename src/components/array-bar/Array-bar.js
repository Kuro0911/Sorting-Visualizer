import PropTypes from "prop-types";
import React from "react";
import ArrayBarWrapper from "./Array-bar.style";

export const ArrayBar = ({ height, active, compare, sorted }) => {
  return (
    <div>
      <ArrayBarWrapper h={height} act={active} comp={compare} sort={sorted}>
        <div className="array-bar"></div>
      </ArrayBarWrapper>
    </div>
  );
};

export default ArrayBar;
