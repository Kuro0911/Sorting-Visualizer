import React from "react";
import TimeComplexityWrapper from "./TimeComp.style";

const TimeComp = ({ worst, avg, best }) => {
  return (
    <TimeComplexityWrapper>
      <h2 className="head">Time Complexity</h2>
      <div className={"textCont"}>
        <p>
          <ul>
            <li>
              Worst Case Time Complexity is: <span>{worst}</span>
            </li>
            <li>
              Average Case Time Complexity is: <span>{avg}</span>
            </li>
            <li>
              Best Case Time Complexity is: <span>{best}</span>
            </li>
          </ul>
        </p>
      </div>
    </TimeComplexityWrapper>
  );
};

export default TimeComp;
