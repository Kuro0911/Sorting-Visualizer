import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import SelectSortWrapper from "./SelectSort.style";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import Tooltip from "@mui/material/Tooltip";

import {
  getArray,
  getRndInteger,
  marks,
  sleep,
} from "../../data/Utilfunctions";
import {
  AboutWrapper,
  Container,
  SlideWrap,
  TopWrap,
} from "../../../styles/global.style";
import { Navbar } from "../Navbar/Navbar";
import { Button, IconButton } from "@mui/material";
import TimeComp from "../time-comp/TimeComp";
import { MyCb } from "../CodeBlock/CodeBlock";
const SelectSort = () => {
  const [disable, setDisable] = useState(false);
  const [heights, setHeights] = useState([]);
  const [length, setLength] = useState(10);
  const [valueTime, setValueTime] = useState(30);
  useEffect(() => {
    setHeights(getArray(length));
  }, [length]);
  const codeString = `#include <bits/stdc++.h>
using namespace std;

void print(int a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        cout << a[i] << " ";
    }
    cout << endl;
}
// SelectSort
void SelectSort(int a[], int n)
{
    for (int i = 0; i < n - 2; i++)
    {
        int Imin = i;
        for (int j = i + 1; j < n; j++)
        {
            if (a[Imin] > a[j])
            {
                Imin = j;
            }
        }
        int temp = a[i];
        a[i] = a[Imin];
        a[Imin] = temp;
    }
    print(a, n);
}
signed main(){
  int n;
  cin >> n;
  int a[n];
  for (int i = 0; i < n; i++)
  {
      cin >> a[i];
  }
  SelectSort(a, n);
  print(a, n);
  return 0;
}
  `;
  const select = async () => {
    const bars = document.getElementsByClassName("array-bar");
    let currMin;
    for (var i = 0; i < heights.length; i++) {
      currMin = i;
      bars[currMin].style.backgroundColor = "#58c7f3";
      bars[currMin].style.boxShadow = "0 0 10px #58c7f3";

      for (var j = i + 1; j < heights.length; j++) {
        bars[j].style.backgroundColor = "#ff8f00";
        bars[j].style.boxShadow = "0 0 10px #ff8f00";

        if (heights[currMin] >= heights[j]) {
          bars[j].style.backgroundColor = "#58c7f3";
          bars[j].style.boxShadow = "0 0 10px #58c7f3";

          await sleep(valueTime * 10);

          bars[currMin].style.backgroundColor = "white";
          bars[currMin].style.boxShadow = "0 0 10px white";

          currMin = j;

          bars[currMin].style.backgroundColor = "#58c7f3";
          bars[currMin].style.boxShadow = "0 0 10px #58c7f3";
        }

        await sleep(valueTime * 10);
        if (j != currMin) {
          bars[j].style.backgroundColor = "white";
          bars[j].style.boxShadow = "0 0 10px white";
        }
      }

      bars[currMin].style.backgroundColor = "#f3cc30";
      bars[currMin].style.boxShadow = "0 0 10px #f3cc30";

      bars[i].style.backgroundColor = "#f3cc30";
      bars[i].style.boxShadow = "0 0 10px #f3cc30";

      await sleep(valueTime * 10);

      let h = heights;
      let temp = h[i];
      bars[i].style.height = `${h[currMin]}vh`;
      h[i] = h[currMin];
      h[currMin] = temp;
      bars[currMin].style.height = `${temp}vh`;
      setHeights(h);

      bars[currMin].style.backgroundColor = "white";
      bars[currMin].style.boxShadow = "0 0 10px white";

      bars[i].style.backgroundColor = "#7fff00";
      bars[i].style.boxShadow = "0 0 10px #7fff00";
      await sleep(valueTime * 10);
    }
    setDisable(false);
  };
  const doSort = () => {
    setDisable(true);
    select();
  };
  const handleReset = () => {
    const bars = document.getElementsByClassName("array-bar");
    setDisable(false);
    let temp = getArray(length);
    for (var i = 0; i < temp.length; i++) {
      bars[i].style.backgroundColor = "white";
      bars[i].style.boxShadow = "0 0 10px white";
      bars[i].style.height = `${temp[i]}vh`;
    }
    setHeights(temp);
  };
  const handleChange = (l, t) => {
    handleReset();
    setValueTime(t);
    setLength(l);
    setHeights(getArray(l));
  };
  return (
    <SelectSortWrapper>
      <Navbar handleChange={handleChange} title={"Selection Sort"} />
      <Container>
        <div className="up">
          <div className="left">
            <Tooltip title="sorted" arrow>
              <div className="square green" />
            </Tooltip>
            <Tooltip title="swapping" arrow>
              <div className="square yellow" />
            </Tooltip>
            <Tooltip title="current minimum" arrow>
              <div className="square blue" />
            </Tooltip>
          </div>
          <div className="right">
            <IconButton
              aria-label="pause"
              className="icon"
              sx={{
                color: "#f3cc30",
              }}
            >
              <RestartAltIcon />
            </IconButton>
            <IconButton
              aria-label="sort"
              onClick={doSort}
              sx={{
                color: "#f3cc30",
              }}
              className="icon"
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              aria-label="shuffle"
              onClick={handleReset}
              className="icon"
              sx={{
                color: "#f3cc30",
              }}
            >
              <ShuffleIcon />
            </IconButton>
          </div>
        </div>
        <div className="down">
          {heights.map((value, key) => {
            return <ArrayBar height={value} total={heights.length} />;
          })}
        </div>
      </Container>
      <AboutWrapper>
        <h1 style={{ color: "#e779c1", fontSize: "3rem", marginBottom: "1em" }}>
          About
        </h1>
        <div className="about-container">
          <MyCb code={codeString} language="cpp" height={"60"} />
          <div className="right">
            <div className="textCont">
              <p>
                The <span>selection sort</span> algorithm sorts an array by
                repeatedly finding the minimum element (considering ascending
                order) from unsorted part and putting it at the beginning. The
                algorithm maintains two subarrays in a given array. The subarray
                which is already sorted. Remaining subarray which is unsorted.
                In every iteration of selection sort, the minimum element
                (considering ascending order) from the unsorted subarray is
                picked and moved to the sorted subarray.
              </p>
              <p>
                <h2 className="head">Approach</h2>
                <ul>
                  <li>Initialize minimum value(min_idx) to location 0</li>
                  <li>
                    Traverse the array to find the minimum element in the array
                  </li>
                  <li>
                    While traversing if any element smaller than min_idx is
                    found then swap both the values.
                  </li>
                  <li>
                    Then, increment min_idx to point to next element Repeat
                    until array is sorted
                  </li>
                </ul>
              </p>
            </div>
            <TimeComp worst={"O(N^2)"} avg={"Ω(N^2)"} best={"Ω(N^2)"} />
          </div>
        </div>
      </AboutWrapper>
    </SelectSortWrapper>
  );
};

export default SelectSort;
