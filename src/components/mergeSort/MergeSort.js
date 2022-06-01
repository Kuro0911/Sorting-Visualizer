import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import MergeSortWrapper from "./MergeSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import {
  getRndInteger,
  isSorted,
  marks,
  sleep,
} from "../../data/Utilfunctions";
import { Container, SlideWrap } from "../../../styles/global.style";

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
  const mergeSort = async (array) => {
    if (array.length === 1) return array;
    const mid = Math.floor(array.length / 2);
    const firstH = await mergeSort(array.slice(0, mid)).then((res) => {
      return res;
    });
    const secondH = await mergeSort(array.slice(mid)).then((res) => {
      return res;
    });
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
    dispatch({
      type: actionTypes.SET_MERGE_DATA,
      mergeData: {
        ...mergeData,
        larr: firstH,
        rarr: secondH,
      },
    });
    while (i < firstH.length) sortedArr.push(firstH[i++]);
    while (j < secondH.length) sortedArr.push(secondH[j++]);
    await sleep(1000);
    return sortedArr;
  };
  const doSort = () => {
    mergeSort(heights).then((res) => {
      // console.log(isSorted(res));
      setHeights(res);
      dispatch({
        type: actionTypes.SET_MERGE_DATA,
        mergeData: {
          ...mergeData,
          sorted: isSorted(res),
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
        larr: [0],
        rarr: [0],
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
              larr={mergeData.larr.includes(value) ? true : false}
              rarr={mergeData.rarr.includes(value) ? true : false}
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
