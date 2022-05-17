import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import MergeSortWrapper, { Container, SlideWrap } from "./MergeSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
const MergeSort = () => {
  const [{ mergeData }, dispatch] = useStateValue();
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const [heights, setHeights] = useState([]);
  const [length, setLength] = useState(5);
  useEffect(() => {
    const temp = [];
    for (var i = 0; i < 5; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
  }, []);

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: 80,
      label: "80",
    },
    {
      value: 90,
      label: "90",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    const temp = [];
    for (var i = 0; i < event.target.value; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setLength(event.target.value);
    setHeights(temp);
  };
  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  const merge = async (a, low, mid, high) => {
    console.log(low, mid, high);
    let temp = new Array();
    let i, k, j;
    i = k = low;
    j = mid + 1;
    while (i <= mid && j <= high) {
      if (a[i] < a[j]) {
        temp[k] = a[i];
        k++;
        i++;
      } else {
        temp[k] = a[j];
        k++;
        j++;
      }
    }
    while (i <= mid) {
      temp[k] = a[i];
      i++;
      k++;
    }
    while (j <= high) {
      temp[k] = a[j];
      j++;
      k++;
    }
    for (var x = low; x <= high; x++) {
      a[x] = temp[x];
    }
  };
  const mergeSort = async (a, low, high) => {
    if (low < high) {
      let mid = Math.floor((low + high) / 2);
      mergeSort(a, low, mid);
      mergeSort(a, mid + 1, high);
      merge(a, low, mid, high);
      return a;
    }
  };
  const doSort = () => {
    mergeSort(heights, 0, heights.length - 1).then((res) => {
      setHeights(res);
      dispatch({
        type: actionTypes.SET_MERGE_DATA,
        mergeData: {
          ...mergeData,
          heights: res,
          sorted: true,
        },
      });
    });
  };
  const handleReset = () => {
    const temp = [];
    for (var i = 0; i < length; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
    dispatch({
      type: actionTypes.SET_MERGE_DATA,
      mergeData: {
        ...mergeData,
        sorted: false,
        heights: temp,
      },
    });
  };
  return (
    <MergeSortWrapper>
      <h1>Merge Sort</h1>
      <Container>
        {heights.map((value, key) => {
          return (
            <ArrayBar
              height={value}
              active={key === mergeData.active ? true : false}
              sorted={mergeData.sorted}
            />
          );
        })}
      </Container>
      <SlideWrap>
        <Box sx={{ width: 300 }}>
          <Slider
            onChange={handleChange}
            aria-label="Always visible"
            defaultValue={5}
            getAriaValueText={valuetext}
            step={5}
            marks={marks}
            valueLabelDisplay="on"
          />
        </Box>
      </SlideWrap>
      <button onClick={doSort}>Sort</button>
      <button onClick={handleReset}>Shuffle</button>
    </MergeSortWrapper>
  );
};

export default MergeSort;
