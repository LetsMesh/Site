import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { paths } from "src/routes/route-paths";
import { Link as RouterLink } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";
export default function welcomeMessage() {
  //contains the welcome message for the header to the left
  return (
    <>
      <Typography
        textAlign={"center"}
        fontFamily="cocogoose"
        fontSize="36px"
        color="#F2E8DE"
        sx={{
          fontWeight: "bold",
        }}
      >
        Find Your Perfect Mentor or Mentee with Mesh
      </Typography>
      <Typography
        fontWeight={500}
        textAlign={"center"}
        fontFamily="cocogoose"
        fontSize="24px"
        color="#F2E8DE"
      >
        Unlock Your Potential with Expert Guidance and Support.
      </Typography>
      <Button
        variant="contained"
        color="success"
        component={RouterLink}
        to={paths.sign_up}
        sx={{ fontWeight: "600", fontSize: "20px", padding: "6px 30px" }}
      >
        Sign Up
        <ChevronRight />
      </Button>
    </>
  );
}
