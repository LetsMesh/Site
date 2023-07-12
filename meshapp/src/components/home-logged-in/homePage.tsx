import { Grid, Typography, Button, Stack, Alert } from "@mui/material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import group_image from "../../assets/media/group_image.png";
import React from "react";

export default function homePage() {
  {
    /*-----------------Group image container------------*/
  }
  const imgContainer = (
    <Grid
      container
      display="flex"
      justifyContent="center"
      bgcolor="#CCCCCC"
      sx={{
        width: "60vw",
        "@media (min-width: 600px)": {
          width: "52vw",
        },
        "@media (min-width: 1000px)": {
          width: "45vw",
        },
        "@media (min-width: 1500px)": {
          width: "40vw",
        },
        "@media (min-width: 2000px)": {
          width: "43vw",
        },
      }}
    >
      <img src={group_image} width="550vw"></img>
    </Grid>
  );

  {
    /*-------------------Alert box------------------------*/
  }
  const alertBox = (
    <Alert
      severity="error"
      icon={
        <ErrorOutline
          sx={{
            fontSize: "15px",
            "@media (min-width: 600px)": {
              fontSize: "19px",
            },
            "@media (min-width: 1000px)": {
              fontSize: "25px",
            },
            "@media (min-width: 1500px)": {
              fontSize: "32px",
            },
            "@media (min-width: 2000px)": {
              fontSize: "44px",
            },
          }}
        />
      }
    >
      <Stack
        spacing={1}
        direction="column"
        flexWrap="wrap"
        sx={{ height: "100%" }}
      >
        <Typography variant="subtitle1">
          <strong>Notice</strong>
        </Typography>
        <Typography variant="subtitle2">
          Please update your profile with the following items:
          <br /> - Biography
          <br /> - Years of Experience
          <br /> - Career
          <br /> - Interests
        </Typography>
      </Stack>
    </Alert>
  );

  {
    /*------------Grid item for the group image and alert box-----------------*/
  }
  const imgAlertItem = () => {
    return (
      <Grid item>
        <Stack direction="column" flexWrap="wrap" spacing={2}>
          {imgContainer}
          {alertBox}
        </Stack>
      </Grid>
    );
  };

  {
    /*----------------------Grid item for the top text----------------------*/
  }
  const topText = () => {
    return (
      <Grid item xs={9}>
        <Typography
          color="#F2E8DE"
          fontFamily="cocogoose"
          fontWeight="600"
          textAlign="center"
          lineHeight="1"
          variant="h1"
        >
          Find Your Perfect Mentor or Mentee with Mesh
        </Typography>
      </Grid>
    );
  };

  {
    /*----------------------Grid item for the bottom text----------------------*/
  }
  const bottomTextItem = () => {
    return (
      <Grid item>
        <Typography
          color="#F2E8DE"
          fontFamily="cocogoose"
          textAlign="center"
          variant="h2"
        >
          Unlock Your Potential with Expert Guidance and Support.
        </Typography>
      </Grid>
    );
  };

  {
    /*----------------------Grid item for the swipe button----------------------*/
  }
  const swipeButton = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          sx={{
            width: "14em",
            height: "3em",
            borderRadius: 4,
          }}
        >
          <Typography
            fontWeight="600"
            color="#F2E8DE"
            variant="button"
            fontFamily="cocogoose"
          >
            {"Start Swiping >"}
          </Typography>
        </Button>
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={"primary.main"}
        height="100%"
        sx={{
          minHeight: "100vh",
          gap: "15px",
        }}
      >
        {imgAlertItem()}

        <Grid
          container
          xs={5}
          gap="50px"
          display="flex"
          justifyContent="center"
          mb="100px"
        >
          {topText()}

          {/*-----------Grid item for bottom text & swipe button----------------*/}
          <Grid item xs={7}>
            <Grid container gap="20px" display="flex" justifyContent="center">
              {bottomTextItem()}
              {swipeButton()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
