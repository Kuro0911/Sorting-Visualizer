import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import MergeSortWrapper from "./MergeSort.style";
import {
  AboutWrapper,
  Container,
  SlideWrap,
  TopWrap,
} from "../../../styles/global.style";
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
import Button from "../../data/Button";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import TimeComp from "../time-comp/TimeComp";
const MergeSort = ({ button }) => {
  const [{ mergeData }, dispatch] = useStateValue();
  const [heights, setHeights] = useState([]);
  const [length, setLength] = useState(10);
  const [valueTime, setValueTime] = useState(30);
  useEffect(() => {
    const temp = [];
    for (var i = 0; i < 10; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
  }, []);
  function valuetext(value) {
    return `${value}`;
  }
  const handleChangeTime = (event, newValue) => {
    setValueTime(newValue);
  };
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
    await sleep(valueTime * 40);

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
        larr: [0],
        rarr: [0],
      },
    });
  };
  return (
    <MergeSortWrapper>
      <TopWrap>
        <h1>Merge Sort</h1>
        <div className="container">
          <SlideWrap>
            <Box sx={{ width: 300 }}>
              <Slider
                onChange={handleChange}
                aria-label="Always visible"
                defaultValue={10}
                getAriaValueText={valuetext}
                step={5}
                marks={marks}
                valueLabelDisplay="on"
                min={5}
                max={100}
              />
            </Box>
          </SlideWrap>
          <SlideWrap>
            <Box sx={{ width: 200 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <SpeedIcon />
                <Slider
                  aria-label="Volume"
                  value={valueTime}
                  onChange={handleChangeTime}
                />
              </Stack>
            </Box>
          </SlideWrap>
          <Button {...button} title="Sort" onClick={doSort} />
          <Button {...button} title="Shuffle" onClick={handleReset} />
        </div>
      </TopWrap>
      <Container>
        {heights.map((value, key) => {
          return (
            <ArrayBar
              height={value}
              total={heights.length}
              larr={mergeData.larr.includes(value) ? true : false}
              rarr={mergeData.rarr.includes(value) ? true : false}
              sorted={mergeData.sorted}
            />
          );
        })}
      </Container>
      <AboutWrapper>
        <h1>About</h1>
        <div className={"textCont"}>
          <p>
            Like QuickSort, <b>Merge Sort</b> is a Divide and Conquer algorithm.
            It divides the input array into two halves, calls itself for the two
            halves, and then it merges the two sorted halves. The merge()
            function is used for merging two halves. The merge(arr, l, m, r) is
            a key process that assumes that arr[l..m] and arr[m+1..r] are sorted
            and merges the two sorted sub-arrays into one.
          </p>
          <p>
            <b>Pseudocode :</b>
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
            <b>Algorithm :</b>
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
                if left > right
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
      </AboutWrapper>
      <TimeComp
        worst={"Ω(n log(n))"}
        avg={"θ(n log(n))"}
        best={"Ω(n log(n))"}
      />
    </MergeSortWrapper>
  );
};
MergeSort.propTypes = {
  button: PropTypes.object,
};

MergeSort.defaultProps = {
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

export default MergeSort;
