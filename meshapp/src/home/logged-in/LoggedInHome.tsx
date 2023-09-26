import React from "react";
import homePage from "../../components/home-logged-in/homePage";
import { Theme, ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

export default function LoggedInHome() {
  return (
    <>
      <ThemeProvider
        theme={(theme: Theme) => {
          return createTheme(deepmerge(homeTheme(), theme));
        }}
      >
        {homePage()}
      </ThemeProvider>
    </>
  );
}

function homeTheme() {
  const theme = createTheme();

  theme.typography.h1 = {
    "@media (width < 600px)": {
      fontSize: "23px",
    },
    "@media (min-width:600px)": {
      fontSize: "24px",
    },
    "@media (min-width:900px)": {
      fontSize: "31px",
    },
    "@media (min-width:1200px)": {
      fontSize: "43px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "55px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "64px",
    },
  };

  theme.typography.h2 = {
    "@media (width < 600px)": {
      fontSize: "20px",
    },
    "@media (min-width:600px)": {
      fontSize: "17px",
    },
    "@media (min-width:900px)": {
      fontSize: "23px",
    },
    "@media (min-width:1200px)": {
      fontSize: "29px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "38px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "42px",
    },
  };

  theme.typography.button = {
    "@media (width < 600px)": {
      fontSize: "13px",
    },
    "@media (min-width:600px)": {
      fontSize: "10px",
    },
    "@media (min-width:900px)": {
      fontSize: "14px",
    },
    "@media (min-width:1200px)": {
      fontSize: "16px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "21px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "30px",
    },
  };
  return theme;
}
