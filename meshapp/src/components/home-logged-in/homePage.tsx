import { Grid, Typography, Button, Stack, Alert } from "@mui/material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import group_image from "../../assets/media/group_image.png";
import { paths } from "../../Routing/RoutePaths";
import { Link as RouterLink } from "react-router-dom";

export default function homePage() {
  /*-----------------Group image container------------*/

  const imgContainer = (
    <Grid container display="flex" justifyContent="center" bgcolor="#CCCCCC">
      <Grid item>
        <img alt="group_image" srcSet={`${group_image} 1050w`}></img>
      </Grid>
    </Grid>
  );

  /*-------------------Alert box------------------------*/

  const alertBox = (
    <Alert severity="error" icon={<ErrorOutline sx={{ fontSize: "4vh" }} />}>
      <Stack spacing={1} direction="column" flexWrap="wrap">
        <Typography fontSize="3vh">
          <strong>Notice</strong>
        </Typography>
        <Typography fontSize="2.5vh">
          Please update your profile with the following items:
          <br /> - Biography
          <br /> - Years of Experience
          <br /> - Career
          <br /> - Interests
        </Typography>
      </Stack>
    </Alert>
  );

  /*------------Grid item for the group image and alert box-----------------*/

  const imgAlertItem = () => {
    return (
      <Grid item xs={8} sm={5}>
        <Stack direction="column" flexWrap="wrap" spacing={2}>
          {imgContainer}
          {alertBox}
        </Stack>
      </Grid>
    );
  };

  /*----------------------Grid item for the top text----------------------*/

  const topText = () => {
    return (
      <Grid item xs={11}>
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

  /*----------------------Grid item for the bottom text----------------------*/

  const bottomTextItem = () => {
    return (
      <Grid item xs={9}>
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

  /*----------------------Grid item for the swipe button----------------------*/

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
          component={RouterLink}
          to={paths.profile_swipe}
        >
          <Typography
            fontWeight="600"
            color="#F2E8DE"
            variant="button"
            fontFamily="cocogoose"
          >
            {`Start Swiping >`}
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
        sx={{
          minHeight: "100vh",
        }}
        gap="10px"
      >
        {imgAlertItem()}

        <Grid
          item
          container
          xs={10}
          sm={5}
          gap="45px"
          display="flex"
          justifyContent="center"
          mb="75px"
        >
          {topText()}
          {/*-----------Grid item for bottom text & swipe button----------------*/}
          <Grid container gap="20px" display="flex" justifyContent="center">
            {bottomTextItem()}
            {swipeButton()}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
