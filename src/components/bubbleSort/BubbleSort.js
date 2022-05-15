import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import BubbleSortWrapper, { Container, SlideWrap } from "./BubbleSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
const BubbleSort = () => {
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const [heights, setHeights] = useState([]);
  const [length, setLength] = useState(5);
  const [active, setActive] = useState(0);

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
  const Bubble = (a, n) => {
    for (var i = 0; i < n; i++) {
      let flag = false;
      for (var j = 0; j < n - 1; j++) {
        setActive(j);
        if (a[j] > a[j + 1]) {
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
    setHeights(a);
  };
  const doSort = () => {
    setActive(0);
    Bubble(heights, heights.length);
    console.log(heights);
  };
  const handleReset = () => {
    setActive(0);
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
          console.log(active);
          return (
            <ArrayBar
              height={value}
              active={key == active || key == active + 1 ? true : false}
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
