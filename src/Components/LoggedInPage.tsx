import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import EmailIcon from "@mui/icons-material/Email";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import GroupImage from "./Images/group_image.png";
import titleImage from "./Images/titleImage.png";

import NotificationButton from "./Images/NotifcationButton.png";
import SignInMenu from "./SideMenu";
import "./LoggedInPage.css";

export default function LoggedInPage() {
  return (
    <>
      <header className="Header">
        <Grid
          container
          style={{ backgroundColor: "#0b7d66", flexDirection: "row" }}
        >
          <Grid item xs={0} padding={2}>
            <SignInMenu />
          </Grid>

          <Grid item xs={0} padding={2}>
            <ToggleButton value="left">
              <img src={NotificationButton}></img>
            </ToggleButton>
          </Grid>

          <Grid item xs={8}></Grid>
          <Grid item xs={0} >
            {/* TODO: Need to use title image to fit into here */}
              <Typography className="MeshTitle">
              mesh
              </Typography>
          </Grid>
        </Grid>
      </header>

      <body className="Body">
        <Grid container spacing={5}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <Stack direction="column" spacing={2} flexWrap="wrap">
              <Box
                sx={{
                  width: 400,
                  borderRadius: "sm",
                  p: 1,
                  backgroundColor: "gray",
                }}
              >
                <img src={GroupImage} />
              </Box>
              <Paper elevation={10} id="AlertBox">
                <Alert severity="error">
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Typography variant="h5" id="Notice">
                      Notice
                    </Typography>
                    <Typography variant="h6" id="PleaseUpdate">
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
          {/* TODO: Need to fix button spacing as well as general sizing for page */}
          <Grid item xs={4}>
            <Typography variant="h1" id="TextBox1" align="center">
              Find Your Perfect Mentor or Mentee with Mesh
            </Typography>
            <Typography variant="h3" id="TextBox2" align="center">
              Unlock Your Potential with Expert Guidance and Support
            </Typography>
            <Button variant="contained" id="StartSwipingButton" fullWidth>
              Start Swiping
            </Button>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <br />
      </body>

      <footer className="Footer">
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
