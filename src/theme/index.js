import React, { useState, useMemo } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Switch from "@mui/material/Switch";

import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import ToggleColorMode from "../layouts/ToggleColorMode";

// import Header from "./Header";

function ThemeProvider({ children }) {
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
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
