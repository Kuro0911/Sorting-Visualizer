import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import SelectSortWrapper from "./SelectSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
import { Container, SlideWrap } from "../../../styles/global.style";

const SelectSort = () => {
  const [{ selectData }, dispatch] = useStateValue();
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
  const select = async (a, n) => {
    for (var i = 0; i < n - 1; i++) {
      await sleep(250);
      let Imin = i;
      for (var j = i + 1; j < n; j++) {
        dispatch({
          type: actionTypes.SET_SELECT_DATA,
          selectData: {
            ...selectData,
            active: j,
          },
        });
        await sleep(700);
        if (a[Imin] > a[j]) {
          Imin = j;
          dispatch({
            type: actionTypes.SET_SELECT_DATA,
            selectData: {
              ...selectData,
              currMin: Imin,
            },
          });
        }
      }
      let temp = a[i];
      a[i] = a[Imin];
      a[Imin] = temp;
      dispatch({
        type: actionTypes.SET_SELECT_DATA,
        selectData: {
          ...selectData,
          currMin: i,
        },
      });
    }
    dispatch({
      type: actionTypes.SET_SELECT_DATA,
      selectData: {
        ...selectData,
        active: heights.length + 1,
        currMin: heights.length + 1,
        sorted: true,
      },
    });
  };
  const doSort = () => {
    select(heights, heights.length);
    console.log(heights);
  };
  const handleReset = () => {
    dispatch({
      type: actionTypes.SET_SELECT_DATA,
      selectData: {
        ...selectData,
        active: 0,
        currMin: 0,
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
    <SelectWrapper>
      <h1>Selection Sort</h1>
      <Container>
        {heights.map((value, key) => {
          return (
            <ArrayBar
              height={value}
              active={key === selectData.active ? true : false}
              min={key === selectData.currMin ? true : false}
              sorted={selectData.sorted}
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
    </SelectWrapper>
  );
};

export default SelectSort;
