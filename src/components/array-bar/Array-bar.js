import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ArrayBarWrapper from "./Array-bar.style";

export const ArrayBar = ({ height, total }) => {
  return (
    <div>
      <ArrayBarWrapper h={height} tot={total}>
        <div className="array-bar"></div>
      </ArrayBarWrapper>
    </div>
  );
};

export default ArrayBar;
