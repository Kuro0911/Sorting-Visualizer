import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ArrayBarWrapper from "./Array-bar.style";

export const ArrayBar = ({
  height,
  total,
  active,
  compare,
  sorted,
  min,
  hole,
  larr,
  rarr,
  largest,
}) => {
  console.log(active);
  return (
    <div>
      <ArrayBarWrapper
        h={height}
        act={active}
        comp={compare}
        sort={sorted}
        mn={min}
        hl={hole}
        tot={total}
        lrr={larr}
        rrr={rarr}
        large={largest}
      >
        <div className="array-bar"></div>
      </ArrayBarWrapper>
    </div>
  );
};

export default ArrayBar;
