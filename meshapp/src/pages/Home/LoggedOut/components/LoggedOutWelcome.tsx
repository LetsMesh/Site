import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { paths } from "src/routes/route-paths";
import { Link as RouterLink } from "react-router-dom";
export default function welcomeMessage() {
  //contains the welcome message for the header to the left
  return (
    <Grid
      item
      container
      xs={5}
      direction="column"
      p={5}
      rowGap={2}
      alignItems="center"
      color="#F2E8DE"
    >
      <Typography variant="h2" textAlign={"center"}>
        Find Your Perfect Mentor or Mentee with Mesh
      </Typography>
      <Typography variant="body1" fontWeight={250} textAlign={"center"}>
        Unlock Your Potential with Expert Guidance and Support.
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to={paths.sign_up}
        sx={{
          "&:hover": {
            backgroundColor: "#0e977b",
          },
          textDecoration: "uppercase",
          padding: "6px 16px",
          fontSize: "20px",
          lineHeight: "24px",
          maxWidth: "250px",
          minWidth: "120px",
          width: "30%",
          height: "50px",
          borderRadius: "15px",
        }}
      >
        <Typography variant="button" fontSize="20px" lineHeight="24px">
          Sign Up
        </Typography>
      </Button>
    </Grid>
  );
}
