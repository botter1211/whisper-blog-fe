import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Switch from "@mui/material/Switch";

import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

// import Header from "./Header";

import ToggleColorMode from "./ToggleColorMode";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

const BlankLayout = () => {
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
          transitionDelay: "2s",
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar sx={{ justifyContent: "flex-end", mr: "20px" }}>
        {/* <Switch
          checked={mode === "dark"}
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
        /> */}
        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
      </Toolbar>
      <Stack minHeight="90vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 120, height: 120, mb: 2 }} mode={mode} />
        <Outlet />
      </Stack>
    </ThemeProvider>
  );
};

export default BlankLayout;
