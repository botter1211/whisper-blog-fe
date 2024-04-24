import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Switch from "@mui/material/Switch";
import Header from "./Header";

import Footer from "./Footer";
// import ToggleColorMode from "./ToggleColorMode";
import { Box, Container, useScrollTrigger } from "@mui/material";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";

import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import PropTypes from "prop-types";

function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const Layout = (props) => {
  const [mode, setMode] = useState("light");
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          background: {
            dark: "hsl(230, 17%, 14%)",
            light: "hsl(0, 0%, 100%)",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header mode={mode} toggleColorMode={toggleColorMode} />
        <AlertMsg />
        <Outlet />
        <Footer />
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
};

export default Layout;
