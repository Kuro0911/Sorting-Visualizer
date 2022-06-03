import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import HeapSortWrapper from "./HeapSort.style";
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

const HeapSort = ({ button }) => {
  const [{ heapData }, dispatch] = useStateValue();
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
  const heapify = async (arr, n, i) => {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) {
      largest = l;
      dispatch({
        type: actionTypes.SET_HEAP_DATA,
        heapData: {
          ...heapData,
          largest: l,
        },
      });
    }
    if (r < n && arr[r] > arr[largest]) {
      largest = r;
      dispatch({
        type: actionTypes.SET_HEAP_DATA,
        heapData: {
          ...heapData,
          largest: r,
        },
      });
    }
    if (largest != i) {
      var swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;
      dispatch({
        type: actionTypes.SET_HEAP_DATA,
        heapData: {
          ...heapData,
          largest: largest,
        },
      });
      setHeights(arr);
      heapify(arr, n, largest);
    }
  };
  const heapSort = async (arr) => {
    var n = length;
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (var i = n - 1; i > 0; i--) {
      await sleep(valueTime * 10);
      var temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      heapify(arr, i, 0);
    }
    dispatch({
      type: actionTypes.SET_HEAP_DATA,
      heapData: {
        ...heapData,
        heights: heights,
        sorted: true,
      },
    });
  };
  const doSort = () => {
    heapSort(heights);
  };
  const handleReset = () => {
    const temp = [];
    for (var i = 0; i < length; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
    dispatch({
      type: actionTypes.SET_HEAP_DATA,
      heapData: {
        ...heapData,
        active: 0,
        largest: 0,
        sorted: false,
      },
    });
  };
  return (
    <HeapSortWrapper>
      <TopWrap>
        <h1>Heap Sort</h1>
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
              active={key === heapData.active ? true : false}
              largest={key === heapData.largest ? true : false}
              sorted={heapData.sorted}
            />
          );
        })}
      </Container>
    </HeapSortWrapper>
  );
};
HeapSort.propTypes = {
  button: PropTypes.object,
};

HeapSort.defaultProps = {
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

export default HeapSort;
