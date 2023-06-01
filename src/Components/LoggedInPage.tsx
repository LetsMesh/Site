import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import EmailIcon from "@mui/icons-material/Email";
import SideMenuButton from "./Images/SideMenuButton.png";
import GroupImage from "./Images/image8.png";
import NotifcationButton from "./Images/NotifcationButton.png";
import ToggleButton from "@mui/material/ToggleButton";

import "./LoggedInPage.css";

export default function LoggedInPage() {
  return (
    <>
      <header className="Header">
        <Grid container>
          <Grid item xs={0} padding={2}>
            <ToggleButton value="left" aria-label="left aligned">
              <img src={SideMenuButton}></img>
            </ToggleButton>
          </Grid>
          <Grid item xs={0} padding={2}>
            <ToggleButton value="left" aria-label="left aligned">
              <img src={NotifcationButton}></img>
            </ToggleButton>
          </Grid>
          <Grid item xs={9}></Grid>
          <Grid item xs={1}>
            <Typography
              variant="h1"
              style={{ color: "#F2E8DE", justifyContent: "flex-end" ,fontWeight:"bold"}}
            >
              mesh
            </Typography>
          </Grid>
        </Grid>
      </header>
      <body className="Body">
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <Stack>
              <Paper
                elevation={10}
                style={{ backgroundColor: "lightgray", marginBottom: 30 }}
              >
                <img
                  src={GroupImage}
                  style={{
                    padding: 5,
                  }}
                ></img>
              </Paper>
              <Paper elevation={10} style={{ backgroundColor: "#FDEDED" }}>
                <Alert severity="error">
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Typography variant="h5">Notice</Typography>
                    <Typography variant="h6" style={{ fontSize: 14 }}>
                      Please update your profile with the following items
                      <br />
                      -Biography
                      <br />
                      -Years of experience
                      <br />
                      -Career
                      <br />
                      -Interests
                    </Typography>
                  </Stack>
                </Alert>
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Typography
              variant="h1"
              style={{ color: "#F2E8DE", fontSize: 72, paddingBottom: 40, fontWeight:250}}
              align="center"
            >
              Find Your Perfect Mentor or Mentee with Mesh
            </Typography>
            <Typography
              variant="h3"
              style={{ color: "#F2E8DE", fontSize: 48, paddingBottom: 50 }}
              align="center"
            >
              Unlock Your Potential with Expert Guidance and Support
            </Typography>
            <Button
              variant="contained"
              style={{ background: "#68D391", borderRadius: 10 }}
              fullWidth
            >
              Start Swiping
            </Button>
            <Grid item xs={1}></Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <br />
      </body>

      <footer className = "Footer">
        <br />
        <br />
        <EmailIcon
          color="action"
          style={{
            display: "flex",
            marginLeft: "auto",
            fontSize: 50,
            padding: 10,
          }}
        ></EmailIcon>
      </footer>
    </>
  );
}
