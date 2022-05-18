import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import MergeSortWrapper, { Container, SlideWrap } from "./MergeSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
const MergeSort = () => {
  const [{ mergeData }, dispatch] = useStateValue();
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
  const mergeSort = (array) => {
    if (array.length === 1) return array;
    const mid = Math.floor(array.length / 2);
    const firstH = mergeSort(array.slice(0, mid));
    const secondH = mergeSort(array.slice(mid));
    const sortedArr = [];
    let i = 0,
      j = 0;
    while (i < firstH.length && j < secondH.length) {
      if (firstH[i] < secondH[j]) {
        sortedArr.push(firstH[i++]);
      } else {
        sortedArr.push(secondH[j++]);
      }
    }
    while (i < firstH.length) sortedArr.push(firstH[i++]);
    while (j < secondH.length) sortedArr.push(secondH[j++]);
    return sortedArr;
  };
  const doSort = () => {
    setHeights(mergeSort(heights));
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
