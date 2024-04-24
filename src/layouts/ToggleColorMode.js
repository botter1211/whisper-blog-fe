import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./ToggleColorMode.css";
import "./toggle.css";
function ToggleColorMode({ mode, toggleColorMode, ...sx }) {
  return (
    <>
      <Box sx={{ maxWidth: "32px" }}>
        {/* <input
          id="checkbox"
          type="checkbox"
          checked={mode === "dark"}
          onChange={toggleColorMode}
        />
        <label className="switch" for="checkbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="slider"
          >
            <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"></path>
          </svg>
        </label> */}
        <label className="bb8-toggle">
          <input
            className="bb8-toggle__checkbox"
            type="checkbox"
            checked={mode === "dark"}
            onChange={toggleColorMode}
          />
          <div className="bb8-toggle__container">
            <div className="bb8-toggle__scenery">
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="bb8-toggle__star"></div>
              <div className="tatto-1"></div>
              <div className="tatto-2"></div>
              <div className="gomrassen"></div>
              <div className="hermes"></div>
              <div className="chenini"></div>
              <div className="bb8-toggle__cloud"></div>
              <div className="bb8-toggle__cloud"></div>
              <div className="bb8-toggle__cloud"></div>
            </div>
            <div className="bb8">
              <div className="bb8__head-container">
                <div className="bb8__antenna"></div>
                <div className="bb8__antenna"></div>
                <div className="bb8__head"></div>
              </div>
              <div className="bb8__body"></div>
            </div>
            <div className="artificial__hidden">
              <div className="bb8__shadow"></div>
            </div>
          </div>
        </label>

        {/* <Button
          variant="text"
          onClick={toggleColorMode}
          size="small"
          aria-label="button to toggle theme"
          sx={{ minWidth: "32px", height: "32px", p: "4px" }}
          color="inherit"
        >
          {mode === "dark" ? (
            <WbSunnyRoundedIcon fontSize="medium" />
          ) : (
            <ModeNightRoundedIcon fontSize="medium" />
          )}
        </Button> */}
      </Box>
    </>
  );
}

export default ToggleColorMode;
