import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import InsertSortWrapper from "./InsertSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
import {
  Container,
  SlideWrap,
  TopWrap,
  AboutWrapper,
} from "../../../styles/global.style";
import { Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import Button from "../../data/Button";
import PropTypes from "prop-types";
import TimeComp from "../time-comp/TimeComp";

const InsertSort = ({ button }) => {
  const [{ insertData }, dispatch] = useStateValue();
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
      await sleep(valueTime * 10 + 250);
      while (hole > 0 && a[hole - 1] > val) {
        await sleep(valueTime * 10);
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
    await sleep(valueTime * 10 + 300);
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
        hole: 0,
        active: 1,
      },
    });
  };
  return (
    <InsertSortWrapper>
      <TopWrap>
        <h1>Insert Sort</h1>
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
              active={key === insertData.active ? true : false}
              sorted={insertData.sorted}
              hole={key === insertData.hole ? true : false}
            />
          );
        })}
      </Container>
      <AboutWrapper>
        <h1>About</h1>
        <div className={"textCont"}>
          <p>
            <b>Insertion sort</b> is a simple sorting algorithm that works
            similar to the way you sort playing cards in your hands. The array
            is virtually split into a sorted and an unsorted part. Values from
            the unsorted part are picked and placed at the correct position in
            the sorted part.
          </p>
          <p>
            <b>Characteristics of Insertion Sort:</b>
            <ul>
              <li>
                This algorithm is one of the simplest algorithm with simple
                implementation
              </li>
              <li>
                Basically, Insertion sort is efficient for small data values
              </li>
              <li>
                Insertion sort is adaptive in nature, i.e. it is appropriate for
                data sets which are already partially sorted.
              </li>
            </ul>
          </p>
          <p>
            <b>Insertion Sort Algorithm</b>
            <ul>
              <li>To sort an array of size N in ascending order:</li>
              <li>Iterate from arr[1] to arr[N] over the array.</li>
              <li>Compare the current element (key) to its predecessor.</li>
              <li>
                If the key element is smaller than its predecessor, compare it
                to the elements before. Move the greater elements one position
                up to make space for the swapped element.
              </li>
            </ul>
          </p>
        </div>
      </AboutWrapper>
      <TimeComp worst={"O(n^2)"} avg={"θ(n^2)"} best={"Ω(n)"} />
    </InsertSortWrapper>
  );
};
InsertSort.propTypes = {
  button: PropTypes.object,
};

InsertSort.defaultProps = {
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
export default InsertSort;
