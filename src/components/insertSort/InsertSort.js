import React, { useEffect, useState } from "react";
import InsertSortWrapper from "./InsertSort.style";
import ArrayBar from "../array-bar/Array-bar";
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

const InsertSort = () => {
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
// InsertSort
void insertSort(int a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        int hole = i;
        int val = a[i];
        while (hole > 0 && a[hole - 1] > val)
        {
            a[hole] = a[hole - 1];
            hole = hole - 1;
        }
        a[hole] = val;
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
  InsertSort(a, n);
  print(a, n);
  return 0;
}
  `;

  const insertSort = async () => {
    const bars = document.getElementsByClassName("array-bar");
    for (var i = 0; i < heights.length; i++) {
      let val = heights[i];
      let hole = i;
      bars[hole].style.backgroundColor = "#ff8f00";
      bars[hole].style.boxShadow = "0 0 10px #ff8f00";
      await sleep(valueTime * 7);
      while (hole > 0 && heights[hole - 1] > val) {
        let temp = heights[hole];

        bars[hole].style.backgroundColor = "#f3cc30";
        bars[hole].style.boxShadow = "0 0 10px #f3cc30";
        bars[hole - 1].style.backgroundColor = "#f3cc30";
        bars[hole - 1].style.boxShadow = "0 0 10px #f3cc30";

        await sleep(valueTime * 10);

        bars[hole].style.height = `${heights[hole - 1]}vh`;
        heights[hole] = heights[hole - 1];
        heights[hole - 1] = temp;
        bars[hole - 1].style.height = `${temp}vh`;

        bars[hole].style.backgroundColor = "#58c7f3";
        bars[hole].style.boxShadow = "0 0 10px #58c7f3";

        await sleep(valueTime * 7);

        hole = hole - 1;
        bars[hole].style.backgroundColor = "#ff8f00";
        bars[hole].style.boxShadow = "0 0 10px #ff8f00";

        await sleep(valueTime * 10);
      }

      await sleep(valueTime * 10);

      bars[hole].style.height = `${val}vh`;
      bars[hole].style.backgroundColor = "#58c7f3";
      bars[hole].style.boxShadow = "0 0 10px #58c7f3";

      heights[hole] = val;
    }
    for (var i = 0; i < heights.length; i++) {
      bars[i].style.backgroundColor = "#7fff00";
      bars[i].style.boxShadow = "0 0 10px #7fff00";
      await sleep(valueTime * 7);
    }
  };
  const doSort = async () => {
    if (disable === false) {
      setDisable(true);
      await insertSort().then(() => setDisable(false));
    }
  };
  const handleReset = () => {
    if (disable === false) {
      const bars = document.getElementsByClassName("array-bar");
      let temp = getArray(length);
      for (var i = 0; i < temp.length; i++) {
        bars[i].style.backgroundColor = "white";
        bars[i].style.boxShadow = "0 0 10px white";
        bars[i].style.height = `${temp[i]}vh`;
      }
      setHeights(temp);
    }
  };
  const handleChange = (l, t) => {
    if (disable === false) {
      handleReset();
      setValueTime(t);
      setLength(l);
      setHeights(getArray(l));
    }
  };

  return (
    <InsertSortWrapper>
      <Navbar handleChange={handleChange} title={"Insert Sort"} />
      <Container>
        <div className="up">
          <div className="left">
            <Tooltip title="sorted" arrow>
              <div className="square green" />
            </Tooltip>
            <Tooltip title="swapping" arrow>
              <div className="square yellow" />
            </Tooltip>
            <Tooltip title="traversed" arrow>
              <div className="square blue" />
            </Tooltip>
            <Tooltip title="the hole" arrow>
              <div className="square orange" />
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
                <b>Insertion sort</b> is a simple sorting algorithm that works
                similar to the way you sort playing cards in your hands. The
                array is virtually split into a sorted and an unsorted part.
                Values from the unsorted part are picked and placed at the
                correct position in the sorted part.
              </p>
              <p>
                <h2 className="head">Characteristics of Insertion Sort:</h2>
                <ul>
                  <li>
                    This algorithm is one of the simplest algorithm with simple
                    implementation
                  </li>
                  <li>
                    Basically, Insertion sort is efficient for small data values
                  </li>
                  <li>
                    Insertion sort is adaptive in nature, i.e. it is appropriate
                    for data sets which are already partially sorted.
                  </li>
                </ul>
              </p>
              <p>
                <h2 className="head">Insertion Sort Algorithm</h2>
                <ul>
                  <li>To sort an array of size N in ascending order:</li>
                  <li>Iterate from arr[1] to arr[N] over the array.</li>
                  <li>Compare the current element (key) to its predecessor.</li>
                  <li>
                    If the key element is smaller than its predecessor, compare
                    it to the elements before. Move the greater elements one
                    position up to make space for the swapped element.
                  </li>
                </ul>
              </p>
            </div>
            <TimeComp worst={"O(N^2)"} avg={"Ω(N^2)"} best={"Ω(N)"} />
          </div>
        </div>
      </AboutWrapper>
    </InsertSortWrapper>
  );
};

export default InsertSort;
