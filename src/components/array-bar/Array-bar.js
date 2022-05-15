import PropTypes from "prop-types";
import React from "react";
import ArrayBarWrapper from "./Array-bar.style";

export const ArrayBar = ({ height, active }) => {
  return (
    <div>
      <ArrayBarWrapper h={height} act={active}>
        <div className="array-bar"></div>
      </ArrayBarWrapper>
    </div>
  );
};

export default ArrayBar;
