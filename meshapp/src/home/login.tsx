import React, { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Skeleton,
  Theme,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import LoginWindow from "../components/login-form";
import { paths } from "../Routing/RoutePaths";
import { Link as RouterLink } from "react-router-dom";
const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          width: "75%",
          height: "4.5rem",
          fontSize: "1.5rem",
        },
      },
    },
  },
});

const SignUp = () => {
  return (
    <Grid
      container
      direction="column"
      spacing={5}
      sx={{ textAlign: "center", alignItems: "center" }}
    >
      <Grid item xs width={"80%"}>
        <Typography variant="h2" fontWeight={"bold"}>
          Don't have an account with us yet?
        </Typography>
      </Grid>
      <Grid item xs>
        <Button
          variant="contained"
          sx={{ width: "15em" }}
          component={RouterLink}
          to={paths.sign_up}
        >
          {"Sign Up >"}
        </Button>
      </Grid>
      <Grid item xs>
        <Skeleton variant="rounded" height={"15em"} width={"30em"} />
      </Grid>
    </Grid>
  );
};

const Login = () => {
  return (
    <ThemeProvider
      theme={(theme: Theme) => {
        return createTheme(deepmerge(buttonTheme, theme));
      }}
    >
      <Grid container p={0} bgcolor="primary.main">
        <Grid
          container
          wrap="nowrap"
          spacing={5}
          p={2}
          sx={{
            boxShadow: 10,
            margin: "10em auto",
            maxWidth: "50%",
            minWidth: "1000px",
            bgcolor: "cardBackground.main",
            color: "text.main",
            borderRadius: 5,
          }}
        >
          <Grid item xs>
            <SignUp />
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs>
            <LoginWindow />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
