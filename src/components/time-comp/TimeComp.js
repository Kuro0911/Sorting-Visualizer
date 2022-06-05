import React from "react";
import { AboutWrapper } from "../../../styles/global.style";

const TimeComp = ({ worst, avg, best }) => {
  return (
    <AboutWrapper>
      <h1>Time Complexity</h1>
      <div className={"textCont"}>
        <p>
          <ul>
            <li>Worst Case Time Complexity is: {worst}</li>
            <li>Average Case Time Complexity is: {avg}</li>
            <li>Best Case Time Complexity is: {best}</li>
          </ul>
        </p>
      </div>
    </AboutWrapper>
  );
};

export default TimeComp;
