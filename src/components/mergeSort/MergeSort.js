import React, { useEffect, useState } from "react";
import MergeSortWrapper from "./MergeSort.style";
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
const MergeSort = ({ button }) => {
  const [disable, setDisable] = useState(false);
  const [heights, setHeights] = useState([]);
  const [length, setLength] = useState(10);
  const [valueTime, setValueTime] = useState(30);
  useEffect(() => {
    setHeights(getArray(length));
  }, []);
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
void merge(int *a, int low, int mid, int high)
{
    int temp[101];
    int i, k, j;
    i = k = low;
    j = mid + 1;
    while (i <= mid && j <= high)
    {
        if (a[i] < a[j])
        {
            temp[k] = a[i];
            k++;
            i++;
        }
        else
        {
            temp[k] = a[j];
            k++;
            j++;
        }
    }
    while (i <= mid)
    {
        temp[k] = a[i];
        i++;
        k++;
    }
    while (j <= high)
    {
        temp[k] = a[j];
        j++;
        k++;
    } 
    for (int x = low; x <= high; x++)
    {
        a[x] = temp[x];
    }
}
void mergeSort(int *a, int low, int high)
{
    if (low < high)
    {
        int mid = (low + high) / 2;
        mergeSort(a, low, mid);
        mergeSort(a, mid + 1, high);
        merge(a, low, mid, high);
    }
}
signed main(){
  int n;
  cin >> n;
  int a[n];
  for (int i = 0; i < n; i++)
  {
      cin >> a[i];
  }
  mergeSort(a, 0, n - 1);
  print(a, n);
  return 0;
}
  `;

  const merge = async (st, md, ed, h) => {
    const bars = document.getElementsByClassName("array-bar");

    for (var x = st; x <= md; x++) {
      bars[x].style.backgroundColor = "#ff8f00";
      bars[x].style.boxShadow = "0 0 10px #ff8f00";
      await sleep(valueTime * 10);
    }
    for (var x = ed; x > md; x--) {
      bars[x].style.backgroundColor = "#58c7f3";
      bars[x].style.boxShadow = "0 0 10px #58c7f3";
      await sleep(valueTime * 10);
    }

    let temp = new Array(100).fill(0);
    let i, j, k;
    i = k = st;
    j = md + 1;
    while (i <= md && j <= ed) {
      if (h[i] < h[j]) {
        temp[k] = h[i];
        k++;
        i++;
      } else {
        temp[k] = h[j];
        k++;
        j++;
      }
    }
    while (i <= md) {
      temp[k] = h[i];
      i++;
      k++;
    }
    while (j <= ed) {
      temp[k] = h[j];
      j++;
      k++;
    }

    for (var x = st; x <= ed; x++) {
      h[x] = temp[x];
      bars[x].style.backgroundColor = "#7fff00";
      bars[x].style.boxShadow = "0 0 10px #7fff00";
      bars[x].style.height = `${temp[x]}vh`;
      await sleep(valueTime * 7);
    }
  };
  const mergeSort = async (start, end, h) => {
    const bars = document.getElementsByClassName("array-bar");
    if (start >= end) {
      return;
    }
    let md = Math.floor(start + (end - start) / 2);
    await mergeSort(start, md, h);
    await sleep(valueTime * 7);
    await mergeSort(md + 1, end, h);
    await sleep(valueTime * 7);
    await merge(start, md, end, h);
    setHeights(h);
    await sleep(valueTime * 7);
  };
  const doSort = async () => {
    setDisable(true);
    console.warn(heights);
    let h = heights;
    mergeSort(0, h.length - 1, h);
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
    <MergeSortWrapper>
      <Navbar handleChange={handleChange} title={"Merge Sort"} />
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
          <MyCb code={codeString} language="cpp" height={"80"} />
          <div className="right">
            <div className="textCont">
              <p>
                Like QuickSort, <b>Merge Sort</b> is a Divide and Conquer
                algorithm. It divides the input array into two halves, calls
                itself for the two halves, and then it merges the two sorted
                halves. The merge() function is used for merging two halves. The
                merge(arr, l, m, r) is a key process that assumes that arr[l..m]
                and arr[m+1..r] are sorted and merges the two sorted sub-arrays
                into one.
              </p>
              <p>
                <h2 className="head">Pseudocode</h2>
                <ul>
                  <li>Declare left variable to 0 and right variable to n-1</li>
                  <li>Find mid by medium formula. mid = (left+right)/2</li>
                  <li>Call merge sort on (left,mid)</li>
                  <li>Call merge sort on (mid+1,rear)</li>
                  <li>Continue till left is less than right</li>
                  <li>Then call merge function to perform merge sort.</li>
                </ul>
              </p>
              <p>
                <h2 className="head">Algorithm</h2>
                <ul>
                  <li>step 1: start</li>
                  <li>step 2: declare array and left, right, mid variable </li>
                  <li>
                    step 3: perform merge function.
                    <br />
                    mergesort(array,left,right)
                    <br />
                    mergesort (array, left, right)
                    <br />
                    if left &gt; right
                    <br />
                    return
                    <br />
                    mid= (left+right)/2
                    <br />
                    mergesort(array, left, mid)
                    <br />
                    mergesort(array, mid+1, right)
                    <br />
                    merge(array, left, mid, right)
                  </li>
                  <li>step 4: Stop</li>
                </ul>
              </p>
            </div>
            <TimeComp
              worst={"Ω(n log(n))"}
              avg={"θ(n log(n))"}
              best={"Ω(n log(n))"}
            />
          </div>
        </div>
      </AboutWrapper>
    </MergeSortWrapper>
  );
};

export default MergeSort;
