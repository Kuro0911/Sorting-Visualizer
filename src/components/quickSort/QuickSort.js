import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import QuickSortWrapper from "./QuickSort.style";
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
import { HomeBtn } from "../home/HomeBtn";

const QuickSort = ({ button }) => {
  const [{ quickData }, dispatch] = useStateValue();
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
  const partition = async (a, st, ed) => {
    let pivot = a[ed];
    let pIndex = st;
    for (var i = st; i < ed; i++) {
      await sleep(valueTime * 30);
      dispatch({
        type: actionTypes.SET_QUICK_DATA,
        quickData: {
          ...quickData,
          active: ed,
          hole: i,
        },
      });
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
    dispatch({
      type: actionTypes.SET_QUICK_DATA,
      quickData: {
        ...quickData,
        active: pIndex,
      },
    });
    return pIndex;
  };
  const QuickSort = async (a, start, end) => {
    setHeights(a);
    console.log(heights);
    console.log(isSorted(heights));
    if (start >= end) {
      dispatch({
        type: actionTypes.SET_QUICK_DATA,
        quickData: {
          ...quickData,
          sorted: true,
        },
      });
      return;
    }
    let index = await partition(a, start, end).then((res) => {
      return res;
    });
    await sleep(valueTime * 20);
    await QuickSort(a, start, index - 1);
    await sleep(valueTime * 20);
    await QuickSort(a, index + 1, end);
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
        active: 0,
        sorted: false,
      },
    });
  };
  return (
    <QuickSortWrapper>
      <TopWrap>
        <div className="wrap">
          <HomeBtn />
          <h1>Quick Sort</h1>
        </div>
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
              active={key === quickData.active ? true : false}
              sorted={quickData.sorted}
              hole={key === quickData.hole ? true : false}
            />
          );
        })}
      </Container>
      <AboutWrapper>
        <h1>About</h1>
        <div className={"textCont"}>
          <p>
            Like Merge Sort, <b>QuickSort</b> is a Divide and Conquer algorithm.
            It picks an element as pivot and partitions the given array around
            the picked pivot. There are many different versions of quickSort
            that pick pivot in different ways.
            <ul>
              <li>Always pick first element as pivot.</li>
              <li>Always pick last element as pivot (implemented below)</li>
              <li>Pick a random element as pivot.</li>
              <li>Pick median as pivot.</li>
            </ul>
            The key process in quickSort is partition(). Target of partitions
            is, given an array and an element x of array as pivot, put x at its
            correct position in sorted array and put all smaller elements
            (smaller than x) before x, and put all greater elements (greater
            than x) after x. All this should be done in linear time.
          </p>
        </div>
      </AboutWrapper>
      <TimeComp worst={"O(n^2)"} avg={"θ(n log(n))"} best={"Ω(n log(n))"} />
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
