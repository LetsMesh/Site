import { createTheme } from "@mui/material";
import { componentsUniversalStyles } from "./universal_styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#27383A",
    },
    secondary: {
      main: "#969696",
    },
    cardBackground: {
      main: "#212121",
    },
    action: {
      active: "#F2E8DE8F",
      selected: "#F2E8DE14",
      disabled: "#F1E8DF61",
      disabledBackground: "#F1E8DF1F",
    },
    text: {
      primary: "#F1E8DF",
      secondary: "#F2E8DE",
      disabled: "#F2E8DE61",
    },
    messageBackground: {
      main: "#247C67",
    },
    messageText: {
      main: "#F1E8DF",
    },
    footerLogoColor: {
      main: "#26383A",
    },
    mailIconColor: {
      main: "#247C67",
    },
    signUpDivider: {
      main: "#F1E8DF",
    },
  },
  components: {
    ...componentsUniversalStyles,
    ...{
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: "#74D194",
            },
          },
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: {
            "&.Mui-completed,&.Mui-active": {
              color: "#74D194",
            },
          },
        },
      },
    },
  },
});
