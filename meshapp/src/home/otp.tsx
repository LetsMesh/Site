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
import { paths } from "../Routing/RoutePaths";
import { Link as RouterLink } from "react-router-dom";
import OtpInput from 'react-otp-input';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


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

const Otp = () => {
  const [otp, setOtp] = useState('');

  const boxText = {
    width: '40px',
    height: '40px',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #ccc',
    borderRadius: '5px',
    margin: '5px',
  };

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
          direction="column"
          spacing={5}
          alignItems="center"
          justifyContent="center"
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
          <Grid item>
            <Typography align="center" variant="h4" fontWeight={"bold"} marginBottom={"20px"}>
              Verify MFA
            </Typography>
            <Typography align="center" variant="subtitle1" marginBottom={"10px"}>
              We have sent an email to your account. Please enter the 6-digit code.
            </Typography>
            <Divider orientation="horizontal" />
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
              inputType={'tel'}
              skipDefaultStyles={true}
              inputStyle={boxText}
            />
            <button onClick={() => console.log(otp)}>Test</button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Otp;
