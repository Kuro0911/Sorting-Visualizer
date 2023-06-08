import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import QuickSortWrapper from "./QuickSort.style";
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
import PropTypes from "prop-types";
import { Navbar } from "../Navbar/Navbar";
import { Button, IconButton } from "@mui/material";
import TimeComp from "../time-comp/TimeComp";
import { MyCb } from "../CodeBlock/CodeBlock";

const QuickSort = ({ button }) => {
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
// QuickSort
int partition(int *a, int st, int ed)
{
    int pivot = a[ed];
    int pIndex = st;
    for (int i = st; i < ed; i++)
    {
      if (a[i] <= pivot)
      {
          int temp = a[i];
          a[i] = a[pIndex];
          a[pIndex] = temp;
          pIndex++;
      }
    }
    int temp = a[pIndex];
    a[pIndex] = a[ed];
    a[ed] = temp;
    return pIndex;
}
void QuickSort(int *a, int start, int end)
{
    if (start >= end)
    {
        return;
    }
    int index = partition(a, start, end);
    QuickSort(a, start, index - 1);
    QuickSort(a, index + 1, end);
}
signed main(){
  int n;
  cin >> n;
  int a[n];
  for (int i = 0; i < n; i++)
  {
      cin >> a[i];
  }
  Quick(a, n);
  print(a, n);
  return 0;
}`;

  const partition = async (st, ed) => {
    const bars = document.getElementsByClassName("array-bar");

    let pivot = heights[ed];
    let pIndex = st;

    for (var i = st; i <= ed; i++) {
      bars[i].style.backgroundColor = "#e779c1";
      bars[i].style.boxShadow = "0 0 10px #e779c1";
      await sleep(valueTime * 5);
    }

    bars[pIndex].style.backgroundColor = "#ff8f00";
    bars[pIndex].style.boxShadow = "0 0 10px #ff8f00";

    for (var i = st; i < ed; i++) {
      await sleep(valueTime * 10);
      bars[i].style.backgroundColor = "#58c7f3";
      bars[i].style.boxShadow = "0 0 10px #58c7f3";

      if (heights[i] <= pivot) {
        bars[i].style.backgroundColor = "#f3cc30";
        bars[i].style.boxShadow = "0 0 10px #f3cc30";
        bars[pIndex].style.backgroundColor = "#f3cc30";
        bars[pIndex].style.boxShadow = "0 0 10px #f3cc30";
        await sleep(valueTime * 7);

        let temp = heights[i];
        bars[i].style.height = `${heights[pIndex]}vh`;
        heights[i] = heights[pIndex];
        heights[pIndex] = temp;
        bars[pIndex].style.height = `${temp}vh`;

        bars[pIndex].style.backgroundColor = "#e779c1";
        bars[pIndex].style.boxShadow = "0 0 10px #e779c1";
        bars[i].style.backgroundColor = "#e779c1";
        bars[i].style.boxShadow = "0 0 10px #e779c1";
        pIndex++;
        bars[pIndex].style.backgroundColor = "#ff8f00";
        bars[pIndex].style.boxShadow = "0 0 10px #ff8f00";
        await sleep(valueTime * 10);
      }
      await sleep(valueTime * 10);
      if (i != pIndex) {
        bars[i].style.backgroundColor = "#e779c1";
        bars[i].style.boxShadow = "0 0 10px #e779c1";
      }
    }
    bars[i].style.backgroundColor = "#f3cc30";
    bars[i].style.boxShadow = "0 0 10px #f3cc30";
    bars[pIndex].style.backgroundColor = "#f3cc30";
    bars[pIndex].style.boxShadow = "0 0 10px #f3cc30";
    await sleep(valueTime * 7);
    let temp = heights[pIndex];
    bars[pIndex].style.height = `${heights[ed]}vh`;
    heights[pIndex] = heights[ed];
    heights[ed] = temp;
    bars[ed].style.height = `${temp}vh`;

    bars[pIndex].style.backgroundColor = "#e779c1";
    bars[pIndex].style.boxShadow = "0 0 10px #e779c1";

    for (var i = st; i <= ed; i++) {
      bars[i].style.backgroundColor = "white";
      bars[i].style.boxShadow = "0 0 10px white";
      await sleep(valueTime * 5);
    }
    return pIndex;
  };
  const quickSort = async (start, end) => {
    if (start >= end) {
      return;
    }
    let index = await partition(start, end).then((res) => {
      return res;
    });
    console.log(index);
    await quickSort(start, index - 1);
    await sleep(valueTime * 10);
    await quickSort(index + 1, end);
    const bars = document.getElementsByClassName("array-bar");
    for (var i = start; i <= end; i++) {
      bars[i].style.backgroundColor = "#7fff00";
      bars[i].style.boxShadow = "0 0 10px #7fff00";
      await sleep(valueTime * 7);
    }
  };
  const doSort = () => {
    setDisable(true);
    quickSort(0, heights.length - 1);
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
    <QuickSortWrapper>
      <Navbar handleChange={handleChange} title={"Quick Sort"} />
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
                Like Merge Sort, <b>QuickSort</b> is a Divide and Conquer
                algorithm. It picks an element as pivot and partitions the given
                array around the picked pivot. There are many different versions
                of quickSort that pick pivot in different ways.
                <ul>
                  <li>Always pick first element as pivot.</li>
                  <li>Always pick last element as pivot (implemented below)</li>
                  <li>Pick a random element as pivot.</li>
                  <li>Pick median as pivot.</li>
                </ul>
                The key process in quickSort is partition(). Target of
                partitions is, given an array and an element x of array as
                pivot, put x at its correct position in sorted array and put all
                smaller elements (smaller than x) before x, and put all greater
                elements (greater than x) after x. All this should be done in
                linear time.
              </p>
              <TimeComp
                worst={"O(n^2)"}
                avg={"θ(n log(n))"}
                best={"Ω(n log(n))"}
              />
            </div>
          </div>
        </div>
      </AboutWrapper>
    </QuickSortWrapper>
  );
};
QuickSort.propTypes = {
  button: PropTypes.object,
};

QuickSort.defaultProps = {
  button: {
    type: "button",
    fontSize: "13px",
    fontWeight: "600",
    color: "white",
    borderRadius: "4px",
    pl: "15px",
    pr: "15px",
    colors: "primaryWithBg",
    minHeight: "auto",
    height: `${1}`,
  },
};

export default QuickSort;
