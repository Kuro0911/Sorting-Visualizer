import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/Array-bar";
import SelectSortWrapper from "./SelectSort.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useStateValue } from "../../contexts/StateProvider";
import { actionTypes } from "../../contexts/reducer";
import { getRndInteger, marks, sleep } from "../../data/Utilfunctions";
import {
  AboutWrapper,
  Container,
  SlideWrap,
  TopWrap,
} from "../../../styles/global.style";
import Button from "../../data/Button";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import TimeComp from "../time-comp/TimeComp";
import { HomeBtn } from "../home/HomeBtn";
const SelectSort = ({ button }) => {
  const [{ selectData }, dispatch] = useStateValue();
  const [heights, setHeights] = useState([]);
  const [length, setLength] = useState(10);
  const [valueTime, setValueTime] = useState(30);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const temp = [];
    for (var i = 0; i < 10; i++) {
      const test = getRndInteger(1, 80);
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
  const select = async (a, n) => {
    for (var i = 0; i < n - 1; i++) {
      await sleep(valueTime * 7);
      let Imin = i;
      for (var j = i + 1; j < n; j++) {
        dispatch({
          type: actionTypes.SET_SELECT_DATA,
          selectData: {
            ...selectData,
            active: j,
          },
        });
        await sleep(valueTime * 10);
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
    setDisable(false);
  };
  const doSort = () => {
    setDisable(true);
    select(heights, heights.length);
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
    <SelectSortWrapper>
      <TopWrap>
        <div className="wrap">
          <HomeBtn />
          <h1>Selection Sort</h1>
        </div>

        {/* <div className="container">
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
                sx={{
                  color: "#f3cc30",
                  "& .MuiSlider-markLabel": {
                    color: "white",
                  },
                }}
                disabled={disable}
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
                  disabled={disable}
                  sx={{
                    color: "#f3cc30",
                  }}
                />
              </Stack>
            </Box>
          </SlideWrap>
          <Button
            {...button}
            title="Sort"
            onClick={doSort}
            disabled={disable}
            sx={{
              color: "#f3cc30",
            }}
          />
          <Button
            {...button}
            title="Shuffle"
            onClick={handleReset}
            disabled={disable}
            sx={{
              color: "#f3cc30",
            }}
          />
        </div> */}
      </TopWrap>
      <Container>
        {heights.map((value, key) => {
          return (
            <ArrayBar
              height={value}
              total={heights.length}
              active={key === selectData.active ? true : false}
              min={key === selectData.currMin ? true : false}
              sorted={selectData.sorted}
            />
          );
        })}
      </Container>
      {/* <AboutWrapper>
        <h1>About</h1>
        <div className={"textCont"}>
          <p>
            The <b>selection sort</b> algorithm sorts an array by repeatedly
            finding the minimum element (considering ascending order) from
            unsorted part and putting it at the beginning. The algorithm
            maintains two subarrays in a given array. The subarray which is
            already sorted. Remaining subarray which is unsorted. In every
            iteration of selection sort, the minimum element (considering
            ascending order) from the unsorted subarray is picked and moved to
            the sorted subarray.
          </p>
          <p>
            Approach:
            <ul>
              <li>Initialize minimum value(min_idx) to location 0</li>
              <li>
                Traverse the array to find the minimum element in the array
              </li>
              <li>
                While traversing if any element smaller than min_idx is found
                then swap both the values.
              </li>
              <li>
                Then, increment min_idx to point to next element Repeat until
                array is sorted
              </li>
            </ul>
          </p>
        </div>
      </AboutWrapper>
      <TimeComp worst={"O(N^2)"} avg={"O(N^2)"} best={"O(N^2)"} /> */}
    </SelectSortWrapper>
  );
};
SelectSort.propTypes = {
  button: PropTypes.object,
};

SelectSort.defaultProps = {
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
export default SelectSort;
