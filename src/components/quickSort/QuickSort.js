import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import QuickSortWrapper from "./QuickSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
import { Container, SlideWrap } from "../../../styles/global.style";

const QuickSort = () => {
  const [{ quickData }, dispatch] = useStateValue();
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
  const partition = (a, st, ed) => {
    let pivot = a[ed];
    let pIndex = st;
    for (var i = st; i < ed; i++) {
      if (a[i] <= pivot) {
        let temp = a[i];
        a[i] = a[pIndex];
        a[pIndex] = temp;
        pIndex++;
      }
    }
    let temp = a[pIndex];
    a[pIndex] = a[ed];
    a[ed] = temp;
    return pIndex;
  };
  const QuickSort = async (a, start, end) => {
    if (start >= end) {
      setHeights(a);
      dispatch({
        type: actionTypes.SET_QUICK_DATA,
        quickData: {
          ...quickData,
          sorted: true,
          heights: a,
        },
      });
      return;
    }
    let index = partition(a, start, end);
    QuickSort(a, start, index - 1);
    QuickSort(a, index + 1, end);
  };
  const doSort = () => {
    QuickSort(heights, 0, heights.length - 1);
  };
  const handleReset = () => {
    const temp = [];
    for (var i = 0; i < length; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
    dispatch({
      type: actionTypes.SET_QUICK_DATA,
      quickData: {
        ...quickData,
        sorted: false,
      },
    });
  };
  return (
    <QuickSortWrapper>
      <h1>Quick Sort</h1>
      <Container>
        {heights.map((value, key) => {
          return (
            <ArrayBar
              height={value}
              active={key === quickData.active ? true : false}
              sorted={quickData.sorted}
              hole={key === quickData.hole ? true : false}
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
    </QuickSortWrapper>
  );
};

export default QuickSort;
