import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import BubbleSortWrapper, { Container, SlideWrap } from "./BubbleSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
const BubbleSort = () => {
  const [{ active, bubbleData }, dispatch] = useStateValue();
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
  const Bubble = async (a, n) => {
    for (var i = 0; i < n; i++) {
      await sleep(250);
      let flag = false;
      for (var j = 0; j < n - 1; j++) {
        await sleep(700);
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
      <h1>Bubble Sort</h1>
      <Container>
        {heights.map((value, key) => {
          return (
            <ArrayBar
              height={value}
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
    </BubbleSortWrapper>
  );
};

export default BubbleSort;
