import { createMuiTheme } from "@material-ui/core/styles";

const CustomTheme = (prefersDarkMode) => createMuiTheme({
  darkMode: true,
  palette: {
    type: "dark",
    textPrimary: {
      main: "#FFFFFF",
    },
    primary: {
      main: "#19283E",
      dark: "#03132B",
      light: "#E0E2DB",
      contrastText: "white"
      
    },
    secondary: {
      main: "#510404",
      dark: "#410303",
    },
  },
}, [prefersDarkMode]);

export default CustomTheme;
