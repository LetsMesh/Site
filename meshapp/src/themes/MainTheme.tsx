import { PaletteMode, createTheme } from "@mui/material";
import { lightTheme } from "./light";
import { darkTheme } from "./dark";

//gets pallete colors and component colors based on mode
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    ...getPalette(mode),
  },

  components: {
    ...getComponents(mode),
  },
  typography: {
    fontFamily: [
      "Cocogoose",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

//returns custom palette colors based on dark or light mode
function getPalette(mode: PaletteMode) {
  //light mode
  return {
    ...(mode === "light"
      ? lightTheme.palette
      : //dark mode
        darkTheme.palette),
    //universal
    avatar: {
      fill: "#BDBDBD",
    },
    chip: {
      defaultCloseFill: "#000000",
    },
    error: {
      main: "#D32F2F",
    },
    alert: {
      errorContent: "#5F2120",
      errorFill: "#FDEDED",
    },
    notiColor: {
      main: "#DE8888",
    },
    messageNotiColor: {
      main: "#CE808B",
    },
    sendMessageBackground: {
      main: "#D9D9D966",
    },
    sendMessageBorder: {
      main: "#000000CC",
    },
  };
}

//returns custom component theme based on dark or light mode
function getComponents(mode: PaletteMode) {
  return {
    ...(mode === "light"
      ? //light mode
        lightTheme.components
      : //dark mode
        darkTheme.components),
  };
}

/*
This function creates and returns theme based on input mode
*/
export default function getMainTheme(mode: PaletteMode) {
  return createTheme(getDesignTokens(mode));
}
