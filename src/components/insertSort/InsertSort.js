import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import InsertSortWrapper, { Container, SlideWrap } from "./InsertSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
const InsertSort = () => {
  const [{ insertData }, dispatch] = useStateValue();
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

  const InsertSort = async (a) => {
    for (var i = 0; i < a.length; i++) {
      dispatch({
        type: actionTypes.SET_INSERT_DATA,
        insertData: {
          ...insertData,
          active: i,
        },
      });
      let hole = i;
      let val = a[i];
      await sleep(750);
      while (hole > 0 && a[hole - 1] > val) {
        await sleep(500);
        a[hole] = a[hole - 1];
        hole = hole - 1;
        dispatch({
          type: actionTypes.SET_INSERT_DATA,
          insertData: {
            ...insertData,
            hole: hole - 1,
          },
        });
      }
      a[hole] = val;
      dispatch({
        type: actionTypes.SET_INSERT_DATA,
        insertData: {
          ...insertData,
          hole: hole,
        },
      });
    }
    await sleep(1000);
    setHeights(a);
    dispatch({
      type: actionTypes.SET_INSERT_DATA,
      insertData: {
        ...insertData,
        sorted: true,
      },
    });
    console.log(heights);
  };
  const doSort = () => {
    InsertSort(heights);
  };
  const handleReset = () => {
    const temp = [];
    for (var i = 0; i < length; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
    dispatch({
      type: actionTypes.SET_INSERT_DATA,
      insertData: {
        ...insertData,
        sorted: false,
      },
    });
  };
  return (
    <InsertSortWrapper>
      <h1>Insert Sort</h1>
      <Container>
        {heights.map((value, key) => {
          return (
            <ArrayBar
              height={value}
              active={key === insertData.active ? true : false}
              sorted={insertData.sorted}
              hole={key === insertData.hole ? true : false}
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
    </InsertSortWrapper>
  );
};

export default InsertSort;
