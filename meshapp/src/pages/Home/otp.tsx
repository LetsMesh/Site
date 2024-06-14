import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Grid, Theme, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import OtpInput from "react-otp-input";
import { axiosInstance } from "src/config/axios-config";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { axiosErrorHandler } from "src/errors/axios-error-handler";
import { isError } from "src/errors/error-checker";
import Swal from "sweetalert2";

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          width: "100%",
          height: "4.5rem",
          fontSize: "1.5rem",
          border: "2px solid #ccc",
        },
      },
    },
  },
});

const Otp = () => {
  // OTP: One Time Password
  const [otp, setOtp] = useState(""); // inital OTP as empty
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["user_id"]);

  useEffect(() => {
    if (cookies.user_id === undefined) {
      // Page is accessed not through login attempt
      let timerInterval: any;
      Swal.fire({
        title: "No session detected",
        html: "Returning to login page in <b></b> seconds",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const popup = Swal.getPopup();
          if (popup !== null) {
            const timer = popup.querySelector("b");
            if (timer !== null) {
              timerInterval = setInterval(() => {
                let timeleft = Swal.getTimerLeft();
                if (typeof timeleft === "number") {
                  timeleft = Math.ceil(timeleft / 1000);
                } else {
                  timeleft = 0;
                }
                timer.textContent = `${timeleft}`;
              }, 100);
            }
          }
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then(() => {
        navigate("/logged_out_home");
      });
    } else {
      const timeoutID = setTimeout(() => {
        // Timer within OTP valid interval
        let timerInterval: any;
        Swal.fire({
          title: "Timeout",
          html: "Returning to login page in <b></b> seconds",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const popup = Swal.getPopup();
            if (popup !== null) {
              const timer = popup.querySelector("b");
              if (timer !== null) {
                timerInterval = setInterval(() => {
                  let timeleft = Swal.getTimerLeft();
                  if (typeof timeleft === "number") {
                    timeleft = Math.ceil(timeleft / 1000);
                  } else {
                    timeleft = 0;
                  }
                  timer.textContent = `${timeleft}`;
                }, 100);
              }
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          navigate("/logged_out_home"); // Return to login page if OTP isn't validated within interval
          removeCookie("user_id");
        });
      }, 60000); // OTP interval in ms
      return () => {
        clearTimeout(timeoutID); // stop timer if OTP is valid
      };
    }
  }, [cookies, navigate, removeCookie]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("otp", otp);
    try {
      await axiosInstance.post("accounts/verify-two-factor-auth/", {
        accountID: cookies.user_id,
        otp: data.get("otp"),
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Verified!",
        showConfirmButton: false,
        timer: 1500,
      });
      removeCookie("user_id");
      navigate("/logged_in_home");
    } catch (err) {
      const error = isError(err);
      axiosErrorHandler(
        new Error("Failed to verify a user's one time password request", {
          cause: error,
        })
      );
    }
  };

  const boxText = {
    width: "40px",
    height: "40px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "2px solid #ccc",
    borderRadius: "5px",
    marginRight: "5px",
    marginBottom: "15px",
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
              We have sent an email to your account. Please enter the 6-digit
              code.
            </Typography>
          </Grid>
          <Grid item>
            <Divider orientation="horizontal" />
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid item xs>
              {/* OTP input field settings */}
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
                inputType={"tel"}
                skipDefaultStyles={true}
                inputStyle={boxText}
              />
            </Grid>
            <Grid item xs>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Otp;
