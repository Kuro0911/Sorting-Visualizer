import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import InsertSortWrapper from "./InsertSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
import { Container, SlideWrap } from "../../../styles/global.style";
const InsertSort = () => {
  const [{ insertData }, dispatch] = useStateValue();
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
