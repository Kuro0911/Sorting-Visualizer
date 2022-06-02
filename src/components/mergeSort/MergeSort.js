import React, { useEffect, useState } from "react";
import ArrayBar from "../array-bar/array-bar";
import MergeSortWrapper from "./MergeSort.style";
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
const MergeSort = ({ button }) => {
  const [{ mergeData }, dispatch] = useStateValue();
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
  const mergeSort = async (array) => {
    if (array.length === 1) return array;
    const mid = Math.floor(array.length / 2);
    const firstH = await mergeSort(array.slice(0, mid)).then((res) => {
      return res;
    });
    const secondH = await mergeSort(array.slice(mid)).then((res) => {
      return res;
    });
    const sortedArr = [];
    let i = 0,
      j = 0;
    while (i < firstH.length && j < secondH.length) {
      if (firstH[i] < secondH[j]) {
        sortedArr.push(firstH[i++]);
      } else {
        sortedArr.push(secondH[j++]);
      }
    }
    dispatch({
      type: actionTypes.SET_MERGE_DATA,
      mergeData: {
        ...mergeData,
        larr: firstH,
        rarr: secondH,
      },
    });
    while (i < firstH.length) sortedArr.push(firstH[i++]);
    while (j < secondH.length) sortedArr.push(secondH[j++]);
    await sleep(valueTime * 40);
    return sortedArr;
  };
  const doSort = () => {
    mergeSort(heights).then((res) => {
      // console.log(isSorted(res));
      setHeights(res);
      dispatch({
        type: actionTypes.SET_MERGE_DATA,
        mergeData: {
          ...mergeData,
          sorted: isSorted(res),
        },
      });
    });
  };
  const handleReset = () => {
    const temp = [];
    for (var i = 0; i < length; i++) {
      const test = getRndInteger(1, 100);
      temp.push(test);
    }
    setHeights(temp);
    dispatch({
      type: actionTypes.SET_MERGE_DATA,
      mergeData: {
        ...mergeData,
        sorted: false,
        larr: [0],
        rarr: [0],
      },
    });
  };
  return (
    <MergeSortWrapper>
      <TopWrap>
        <h1>Merge Sort</h1>
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
              larr={mergeData.larr.includes(value) ? true : false}
              rarr={mergeData.rarr.includes(value) ? true : false}
              sorted={mergeData.sorted}
            />
          );
        })}
      </Container>
      <AboutWrapper>
        <h1>About</h1>
      </AboutWrapper>
    </MergeSortWrapper>
  );
};
MergeSort.propTypes = {
  button: PropTypes.object,
};

MergeSort.defaultProps = {
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

export default MergeSort;
