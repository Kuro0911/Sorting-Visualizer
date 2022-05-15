import PropTypes from "prop-types";
import React from "react";
import ArrayBarWrapper from "./Array-bar.style";

export const ArrayBar = ({ height }) => {
  return (
    <div>
      <ArrayBarWrapper h={height}>
        <h3>{height}</h3>
      </ArrayBarWrapper>
    </div>
  );
};

export default ArrayBar;
