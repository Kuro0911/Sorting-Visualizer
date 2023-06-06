import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { NavbarWrap, SlideWrap, TopWrap } from "./Navbar.style";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { HomeBtn } from "../home/HomeBtn";
import TuneIcon from "@mui/icons-material/Tune";
import { Stack } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import TimeComp from "../time-comp/TimeComp";
import Button from "../../data/Button";
import { marks } from "../../data/Utilfunctions";
import BarChartIcon from "@mui/icons-material/BarChart";

export const Navbar = ({ handleChange }) => {
  const [length, setLength] = useState(10);
  const [valueTime, setValueTime] = useState(30);
  const [disable, setDisable] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeTime = (event, newValue) => {
    setValueTime(newValue);
  };
  const handleChangeLength = (event) => {
    setLength(event.target.value);
  };
  function valuetext(value) {
    return `${value}`;
  }
  return (
    <NavbarWrap>
      <TopWrap>
        <div className="wrap">
          <HomeBtn />
          <h1>Selection Sort</h1>
        </div>

        <div className="container">
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <TuneIcon className="icon" />
          </IconButton>
        </div>
      </TopWrap>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            width: "20vw",
            backgroundColor: "#785adc",
          },
        }}
      >
        <div style={{ width: "100%", textAlign: "center", color: "white" }}>
          <h2>Customize your Input</h2>
        </div>
        <div className="menu-wrap">
          <SlideWrap>
            <Box sx={{ width: 330 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <BarChartIcon sx={{ color: "white" }} />
                <Slider
                  onChange={handleChangeLength}
                  aria-label="Always visible"
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  step={5}
                  marks={marks}
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
              </Stack>
            </Box>
          </SlideWrap>
          <SlideWrap>
            <Box sx={{ width: 330 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <SpeedIcon sx={{ color: "white" }} />
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
        </div>
        <MenuItem onClick={() => handleChange(length, 100 - valueTime)}>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: "1.15rem",
            }}
          >
            SAVE
          </div>
        </MenuItem>
      </Menu>
    </NavbarWrap>
  );
};
