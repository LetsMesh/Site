import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlantImg from "./growing_clipart.png";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function LoginPage() {
  return (
    <Paper
      elevation={3}
      style={{
        padding: 30,
        marginBlock: 50,
        backgroundColor: "gray",
        border: "1px solid black",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid
          container
          item
          xs={6}
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">Don't have an account yet?</Typography>

          <Button variant="contained">Sign Up</Button>
          <img src={PlantImg}></img>
        </Grid>

        <Grid
          container
          item
          xs={6}
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ border: "2px lightgrey solid" }}
        >
          <Typography variant="h2">Login</Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            margin="normal"
          />
          <Stack spacing={2} alignItems={"center"}>
            <Button variant="contained" fullWidth>
              Login
            </Button>
            <a href="#">Forgot Password</a>
            <div>Or</div>

            <Button variant="contained" fullWidth>
              SIGN IN WITH GOOGLE
            </Button>
            <Button variant="contained" fullWidth>
              SIGN IN WITH DISCORD
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
