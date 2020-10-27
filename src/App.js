import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CustomTheme from "./styles";
import { ThemeProvider } from "@material-ui/styles";
import AppRouter from "./app-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from '@material-ui/core/useMediaQuery';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = CustomTheme(prefersDarkMode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
