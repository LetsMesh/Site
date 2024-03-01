import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Theme,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import OtpInput from 'react-otp-input';
import { axiosInstance } from "../config/axiosConfig";
import { useCookies } from 'react-cookie';
import { useEffect } from "react";
import { errorHandler } from "../config/errorHandlerModule";
import Swal from 'sweetalert2'

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          width: "100%",
          height: "4.5rem",
          fontSize: "1.5rem",
          border: '2px solid #ccc',
        },
      },
    },
  },
});

const Otp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['user_id']);

  useEffect(() =>{},[cookies]);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('otp', otp)
    const response = await axiosInstance.post('accounts/verify-two-factor-auth/',{
      "accountID":cookies.user_id,
      "otp":data.get("otp")
    })
      .then((axiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Verified!",
          showConfirmButton: false,
          timer: 1500
        });
        removeCookie("user_id");
        navigate('/logged_in_home');
      })
      .catch(errorHandler); // User's OTP could not be verified
  }
  

  const boxText = {
    width: '40px',
    height: '40px',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #ccc',
    borderRadius: '5px',
    marginRight: '5px',
    marginBottom: '15px',
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
            <Typography align="center" variant="h4" fontWeight={"bold"}>
              Verify MFA
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography align="center" variant="subtitle1">
              We have sent an email to your account. Please enter the 6-digit code.
            </Typography>
          </Grid>
          <Grid item>
            <Divider orientation="horizontal" />
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid item xs>
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
            </Grid>
            <Grid item xs>
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Otp;
