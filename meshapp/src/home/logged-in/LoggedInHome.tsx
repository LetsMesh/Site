import React from "react";
import Header from "../../components/Header";
import homePage from "../../components/home-logged-in/homePage";
import messageFooter from "../../components/home-logged-in/messageFooter";
import { Theme, ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

export default function LoggedInHome() {
  return (
    <>
      <Header />
      <ThemeProvider
        theme={(theme: Theme) => {
          return createTheme(deepmerge(homeTheme(), theme));
        }}
      >
        {homePage()}
      </ThemeProvider>
      {messageFooter()}
    </>
  );
}

function homeTheme() {
  const theme = createTheme();

  theme.typography.h1 = {
    "@media (min-width:600px)": {
      fontSize: "20px",
    },
    "@media (min-width:900px)": {
      fontSize: "31px",
    },
    "@media (min-width:1200px)": {
      fontSize: "42px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "55px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "64px",
    },
  };

  theme.typography.h2 = {
    "@media (min-width:600px)": {
      fontSize: "13px",
    },
    "@media (min-width:900px)": {
      fontSize: "23px",
    },
    "@media (min-width:1200px)": {
      fontSize: "25px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "38px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "42px",
    },
  };

  theme.typography.button = {
    "@media (min-width:600px)": {
      fontSize: "10px",
    },
    "@media (min-width:900px)": {
      fontSize: "15px",
    },
    "@media (min-width:1000px)": {
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
