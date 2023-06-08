import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import BubbleSortWrapper from "./BubbleSort.style";
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

const BubbleSort = () => {
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
// BubbleSort
void BubbleSort(int a[], int n)
{
  for (int i = 0; i < n; i++)
  {
    bool flag = false;
    for (int j = 0; j < n - 1; j++)
    {
      if (a[j] > a[j + 1])
      {
        flag = true;
        int temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
    if (!flag)
        break;
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
  BubbleSort(a, n);
  print(a, n);
  return 0;
}
  `;
  const Bubble = async () => {
    const bars = document.getElementsByClassName("array-bar");
    for (var i = 0; i < heights.length; i++) {
      let flag = false;
      for (var j = 0; j < heights.length - 1; j++) {
        bars[j].style.backgroundColor = "#58c7f3";
        bars[j].style.boxShadow = "0 0 10px #58c7f3";

        if (heights[j] > heights[j + 1]) {
          flag = true;
          bars[j].style.backgroundColor = "#f3cc30";
          bars[j].style.boxShadow = "0 0 10px #f3cc30";

          bars[j + 1].style.backgroundColor = "#f3cc30";
          bars[j + 1].style.boxShadow = "0 0 10px #f3cc30";

          await sleep(valueTime * 10);

          let h = heights;
          let temp = h[j];
          bars[j].style.height = `${h[j + 1]}vh`;
          h[j] = h[j + 1];
          h[j + 1] = temp;
          bars[j + 1].style.height = `${temp}vh`;
          setHeights(h);

          bars[j].style.backgroundColor = "#7fff00";
          bars[j].style.boxShadow = "0 0 10px #7fff00";

          bars[j + 1].style.backgroundColor = "#7fff00";
          bars[j + 1].style.boxShadow = "0 0 10px #7fff00";
        }

        await sleep(valueTime * 10);
        bars[j].style.backgroundColor = "white";
        bars[j].style.boxShadow = "0 0 10px white";
        bars[j + 1].style.backgroundColor = "white";
        bars[j + 1].style.boxShadow = "0 0 10px white";
      }
      if (flag === false) {
        break;
      }
      await sleep(valueTime * 10);
    }
    for (var i = 0; i < heights.length; i++) {
      bars[i].style.backgroundColor = "#7fff00";
      bars[i].style.boxShadow = "0 0 10px #7fff00";
      await sleep(valueTime * 10);
    }
    setDisable(false);
  };

  const doSort = () => {
    if (disable === false) {
      setDisable(true);
      Bubble();
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
    <BubbleSortWrapper>
      <Navbar handleChange={handleChange} title={"Bubble Sort"} />
      <Container>
        <div className="up">
          <div className="left">
            <Tooltip title="sorted" arrow>
              <div className="square green" />
            </Tooltip>
            <Tooltip title="swapping" arrow>
              <div className="square yellow" />
            </Tooltip>
            <Tooltip title="current element" arrow>
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
          <MyCb code={codeString} language="cpp" height={"80"} />
          <div className="right">
            <div className="textCont">
              <p>
                Bubble Sort is the simplest sorting algorithm that works by
                repeatedly swapping the adjacent elements if they are in the
                wrong order. This algorithm is not suitable for large data sets
                as its average and worst case time complexity is quite high.
              </p>
              <p>
                <h2 className="head">How Does it Work?</h2>
                Consider an array arr[] = 5, 1, 4, 2, 8
                <ul>
                  <li>
                    First Pass: Bubble sort starts with very first two elements,
                    comparing them to check which one is greater.
                    <ul>
                      <li>
                        ( 5 1 4 2 8 ) -&gt; ( 1 5 4 2 8 ), Here, algorithm
                        compares the first two elements, and swaps since 5 &gt;
                        1.
                      </li>
                      <li>
                        ( 1 5 4 2 8 ) -&gt; ( 1 4 5 2 8 ), Swap since 5 &gt; 4
                      </li>
                      <li>
                        ( 1 4 5 2 8 ) -&gt; ( 1 4 2 5 8 ), Swap since 5 &gt; 2
                      </li>
                      <li>
                        ( 1 4 2 5 8 ) -&gt; ( 1 4 2 5 8 ), Now, since these
                        elements are already in order (8 &gt; 5), algorithm does
                        not swap them.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Second Pass: Now, during second iteration it should look
                    like this:
                    <ul>
                      <li>( 1 4 2 5 8 ) -&gt; ( 1 4 2 5 8 )</li>
                      <li>
                        ( 1 4 2 5 8 ) -&gt; ( 1 2 4 5 8 ), Swap since 4 &gt; 2
                      </li>
                      <li>( 1 2 4 5 8 ) -&gt; ( 1 2 4 5 8 ) </li>
                      <li>( 1 2 4 5 8 ) -&gt; ( 1 2 4 5 8 )</li>
                    </ul>
                  </li>
                  <li>
                    Third Pass: Now, the array is already sorted, but our
                    algorithm does not know if it is completed. and it needs one
                    whole pass without any swap to know it is sorted.
                    <ul>
                      <li>( 1 2 4 5 8 ) -&gt; ( 1 2 4 5 8 ) </li>
                      <li>( 1 2 4 5 8 ) -&gt; ( 1 2 4 5 8 ) </li>
                      <li>( 1 2 4 5 8 ) -&gt; ( 1 2 4 5 8 ) </li>
                      <li>( 1 2 4 5 8 ) -&gt; ( 1 2 4 5 8 ) </li>
                    </ul>
                  </li>
                </ul>
              </p>
            </div>
            <TimeComp worst={"O(n^2)"} avg={"Ω(n^2)"} best={"Ω(n)"} />
          </div>
        </div>
      </AboutWrapper>
    </BubbleSortWrapper>
  );
};

export default BubbleSort;
