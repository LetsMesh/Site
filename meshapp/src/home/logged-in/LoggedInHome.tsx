import React from "react";
import Header from "../../components/Header";
import homePage from "../../components/home-logged-in/homePage";
import messageFooter from "../../components/home-logged-in/messageFooter";
import { Grid, Theme, ThemeProvider, createTheme } from "@mui/material";
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
    fontSize: "18px",
    "@media (min-width:600px)": {
      fontSize: "24px",
    },
    "@media (min-width:1000px)": {
      fontSize: "32px",
    },
    "@media (min-width: 1500px)": {
      fontSize: "46px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "64px",
    },
  };

  theme.typography.h2 = {
    fontSize: "10px",
    "@media (min-width:600px)": {
      fontSize: "16px",
    },
    "@media (min-width:1000px)": {
      fontSize: "21px",
    },
    "@media (min-width: 1500px)": {
      fontSize: "30px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "42px",
    },
  };

  theme.typography.subtitle1 = {
    fontSize: "10px",
    "@media (min-width:600px)": {
      fontSize: "15px",
    },
    "@media (min-width:1000px)": {
      fontSize: "18px",
    },
    "@media (min-width: 1500px)": {
      fontSize: "21px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "35px",
    },
  };

  theme.typography.subtitle2 = {
    fontSize: "6px",
    "@media (min-width:600px)": {
      fontSize: "14px",
    },
    "@media (min-width:1000px)": {
      fontSize: "16px",
    },
    "@media (min-width: 1500px)": {
      fontSize: "19px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "30px",
    },
  };

  theme.typography.button = {
    fontSize: "10px",
    "@media (min-width:600px)": {
      fontSize: "13px",
    },
    "@media (min-width:1000px)": {
      fontSize: "16px",
    },
    "@media (min-width: 1500px)": {
      fontSize: "21px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "30px",
    },
  };
  return theme;
}
