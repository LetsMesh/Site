import { PaletteMode, createTheme } from "@mui/material";
import React from "react";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#0B7D66",
          },
          secondary: {
            main: "#F2E8DE",
          },
          cardBackground: {
            main: "#FFFFFF",
          },
          action: {
            active: "#0000008F",
          },
          avatarBackground: {
            main: "#D9D9D9",
          },
          buttonColor: {
            main: "#74D194",
          },
          text: {
            primary: "#000000DE",
            secondary: "#00000099",
            disabled: "#00000061",
          },
          chipBackground: {
            main: "#00000014",
          },
          input: {
            outlined: {
              enabledBorder: "#0000003B",
            },
          },
        }
      : {
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
          },
          avatarBackground: {
            main: "#D9D9D9",
          },
          buttonColor: {
            main: "#247C67",
          },
          text: {
            primary: "#F1E8DFDE",
            secondary: "#F2E8DE99",
            disabled: "#F2E8DE61",
          },
          chipBackground: {
            main: "#F2E8DE14",
          },
          input: {
            outlined: {
              enabledBorder: "#F2E8DE3B",
            },
          },
        }),
  },
});

const lightTheme = getDesignTokens("dark");

const theme = createTheme({
  ...lightTheme,
});

export default theme;
