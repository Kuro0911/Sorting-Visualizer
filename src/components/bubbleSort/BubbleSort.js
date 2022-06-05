import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import BubbleSortWrapper from "./BubbleSort.style";
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
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
import Button from "../../data/Button";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import TimeComp from "../time-comp/TimeComp";

const BubbleSort = ({ button }) => {
  const [{ bubbleData }, dispatch] = useStateValue();
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
    dispatch({
      type: actionTypes.SET_BUBBLE_DATA,
      bubbleData: {
        ...bubbleData,
        active: 0,
        compareA: 0,
        compareB: 1,
        sorted: false,
      },
    });
    setLength(event.target.value);
    setHeights(temp);
  };
  const Bubble = async (a, n) => {
    for (var i = 0; i < n; i++) {
      await sleep(valueTime * 10);
      let flag = false;
      for (var j = 0; j < n - 1; j++) {
        await sleep(valueTime * 10 + 250);
        dispatch({
          type: actionTypes.SET_BUBBLE_DATA,
          bubbleData: {
            ...bubbleData,
            active: j,
          },
        });
        if (a[j] > a[j + 1]) {
          // dispatch({
          //   type: actionTypes.SET_BUBBLE_DATA,
          //   bubbleData: {
          //     ...bubbleData,
          //     compareA: j,
          //     compareB: j + 1,
          //   },
          // });
          flag = true;
          let temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
        }
      }
      if (!flag) {
        break;
      }
    }
    dispatch({
      type: actionTypes.SET_BUBBLE_DATA,
      bubbleData: {
        ...bubbleData,
        active: heights.length + 1,
        sorted: true,
      },
    });
    setHeights(a);
  };

  const doSort = () => {
    Bubble(heights, heights.length);
    console.log(heights);
  };
  const handleReset = () => {
    dispatch({
      type: actionTypes.SET_BUBBLE_DATA,
      bubbleData: {
        ...bubbleData,
        active: 0,
        compareA: 0,
        compareB: 1,
        sorted: false,
      },
    });
    const temp = [];
    for (var i = 0; i < length; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
  };
  return (
    <BubbleSortWrapper>
      <TopWrap>
        <h1>Bubble Sort</h1>
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
              active={
                key === bubbleData.active || key === bubbleData.active + 1
                  ? true
                  : false
              }
              sorted={bubbleData.sorted}
            />
          );
        })}
      </Container>
      <AboutWrapper>
        <h1>About</h1>
        <div className={"textCont"}>
          <p>
            Bubble Sort is the simplest sorting algorithm that works by
            repeatedly swapping the adjacent elements if they are in the wrong
            order. This algorithm is not suitable for large data sets as its
            average and worst case time complexity is quite high.
          </p>
          <h2>How Does it Work?</h2>
          <p>
            Consider an array arr[] = {(5, 1, 4, 2, 8)}
            <ul>
              <li>
                First Pass: Bubble sort starts with very first two elements,
                comparing them to check which one is greater.
                <ul>
                  <li>
                    ( 5 1 4 2 8 ) -> ( 1 5 4 2 8 ), Here, algorithm compares the
                    first two elements, and swaps since 5 > 1.
                  </li>
                  <li>( 1 5 4 2 8 ) -> ( 1 4 5 2 8 ), Swap since 5 > 4</li>
                  <li>( 1 4 5 2 8 ) -> ( 1 4 2 5 8 ), Swap since 5 > 2</li>
                  <li>
                    ( 1 4 2 5 8 ) -> ( 1 4 2 5 8 ), Now, since these elements
                    are already in order (8 > 5), algorithm does not swap them.
                  </li>
                </ul>
              </li>
              <li>
                Second Pass: Now, during second iteration it should look like
                this:
                <ul>
                  <li>( 1 4 2 5 8 ) -> ( 1 4 2 5 8 )</li>
                  <li>( 1 4 2 5 8 ) -> ( 1 2 4 5 8 ), Swap since 4 > 2</li>
                  <li>( 1 2 4 5 8 ) -> ( 1 2 4 5 8 ) </li>
                  <li>( 1 2 4 5 8 ) -> ( 1 2 4 5 8 )</li>
                </ul>
              </li>
              <li>
                Third Pass: Now, the array is already sorted, but our algorithm
                does not know if it is completed. and it needs one whole pass
                without any swap to know it is sorted.
                <ul>
                  <li>( 1 2 4 5 8 ) -> ( 1 2 4 5 8 ) </li>
                  <li>( 1 2 4 5 8 ) -> ( 1 2 4 5 8 ) </li>
                  <li>( 1 2 4 5 8 ) -> ( 1 2 4 5 8 ) </li>
                  <li>( 1 2 4 5 8 ) -> ( 1 2 4 5 8 ) </li>
                </ul>
              </li>
            </ul>
          </p>
        </div>
      </AboutWrapper>
      <TimeComp worst={"Ω(n^2)"} avg={"Ω(n^2)"} best={"Ω(n)"} />
    </BubbleSortWrapper>
  );
};
BubbleSort.propTypes = {
  button: PropTypes.object,
};

BubbleSort.defaultProps = {
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

export default BubbleSort;
