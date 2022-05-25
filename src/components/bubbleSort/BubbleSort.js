import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import BubbleSortWrapper from "./BubbleSort.style";
import { Container, SlideWrap, TopWrap } from "../../../styles/global.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
import Button from "../../data/Button";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";

const BubbleSort = ({ button }) => {
  const [{ bubbleData }, dispatch] = useStateValue();
  const [heights, setHeights] = useState([]);
  const [length, setLength] = useState(5);
  const [valueTime, setValueTime] = useState(30);
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
      <Box sx={{ width: 200 }}>
        <h1>About</h1>
        <div>
          Bubble Sort is the simplest sorting algorithm that works by repeatedly
          swapping the adjacent elements if they are in the wrong order. This
          algorithm is not suitable for large data sets as its average and worst
          case time complexity is quite high.
        </div>
      </Box>
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
