import { createTheme } from "@mui/material";
import { componentsUniversalStyles } from "./universal_styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // dark green (theme color)
      main: "#0B7D66",
      light: "#87bfb4",
      dark: "#0B7D66",
      contrastText: "#000000",
    },
    secondary: {
      // beige
      main: "#F2E8DE",
      light: "#f6efe8",
      dark: "#c2bab2",
      contrastText: "#000000",
    },
    success: {
      // light green
      main: "#74D194",
      light: "#74D194",
      dark: "#5da777",
      contrastText: "#000000",
    },
    cardBackground: {
      main: "#FFFFFF",
    },
    action: {
      active: "#0000008F",
      selected: "#00000014",
      disabled: "#00000061",
      disabledBackground: "#0000001F",
    },
    messageBackground: {
      main: "#74D194",
    },
    messageText: {
      main: "#000000",
    },
    footerLogoColor: {
      main: "#1DB272",
    },
    mailIconColor: {
      main: "#74D194",
    },
    signUpDivider: {
      main: "#000000",
    },
  },
  components: {
    ...componentsUniversalStyles,
    ...{
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: "#247C67",
            },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            "&.Mui-completed,&.Mui-active": {
              color: "#247C67",
            },
          },
        },
      },
    },
  },
});
