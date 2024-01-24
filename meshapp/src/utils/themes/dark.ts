import { createTheme } from "@mui/material";
import { componentsUniversalStyles } from "./universal_styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#c1234f",
    },
    background: {
      default: "linear-gradient(to bottom right, #0e1015, #223845)",
    },
    text: {
      primary: "#ffffff", // Set your default text color here
      secondary: "#bababa",
    },
    // ... customize more colors or properties here
  },
  components: {
    ...componentsUniversalStyles,
  },
});
