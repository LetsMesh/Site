import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlantImg from "./growing_clipart.png";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import './login.css';

export default function LoginPage() {
  return (
    <>
      <Paper
        className="MainBubble"
        elevation={3}
        style={{
          padding: 30,
          marginBlock: 50,
          marginLeft: 250,
          marginRight: 250,
          borderRadius: 100,
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            className="LeftSide"
            container
            item
            xs={6}
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h3" style={{ color: "#26383A", fontSize: 40 }}>
              Don't have an account yet?
            </Typography>

            <Button
              className="SignUpButton"
              variant="contained"
              style={{
                background: "#68D391",
                height: 50,
                width: 250,
              }}
              fullWidth
            >
              Sign Up
            </Button>

            <Paper
              elevation={4}
              style={{
                backgroundColor: "lightgray",
                borderRadius: 25,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              <img src={PlantImg}></img>
            </Paper>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
          <Grid
            className="RightSide"
            container
            item
            xs={6}
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h2" style={{ color: "#26383A" }}>
              Login
            </Typography>
            <TextField
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="normal"
            />
            <TextField
              required
              id="outlined-basic"
              label="Password"
              variant="outlined"
              margin="normal"
            />
            <Stack spacing={2} alignItems={"center"}>
              <Button
                className="LoginButton"
                variant="contained"
                style={{
                  background: "#68D391",
                  height: 50,
                  width: 250,
                  borderRadius: 100,
                }}
                fullWidth
              >
                Login
              </Button>
              <a href="#" style={{ color: "#26383A" }}>
                Forgot Password
              </a>
              <div>
                <h2 style={{ color: "#26383A" }}>Or</h2>
              </div>

              <Button
                className="SignInGoogleButton"
                variant="contained"
                style={{
                  background: "#68D391",
                  height: 50,
                  width: 250,
                  borderRadius: 100,
                }}
                fullWidth
              >
                SIGN IN WITH GOOGLE
              </Button>
              <Button
                className="SignInDiscordButton"
                variant="contained"
                style={{
                  background: "#68D391",
                  height: 50,
                  width: 250,
                  borderRadius: 100,
                }}
                fullWidth
              >
                SIGN IN WITH DISCORD
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
