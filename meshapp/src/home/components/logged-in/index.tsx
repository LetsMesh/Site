import { Theme, ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { Grid, Typography, Button, Stack, Alert } from "@mui/material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import group_image from "../../assets/media/group_image.png";
import { Link as RouterLink } from "react-router-dom";
import { paths } from "../../../Routing/RoutePaths";

const LoggedInHome = () => {
  return (
    <>
      <ThemeProvider
        theme={(theme: Theme) => {
          return createTheme(deepmerge(homeTheme(), theme));
        }}
      >
        {homePage()}
      </ThemeProvider>
    </>
  );
};

export default LoggedInHome;

function homePage() {
  /*-----------------Group image container------------*/

  const imgContainer = (
    <Grid container display="flex" justifyContent="center" bgcolor="#CCCCCC">
      <Grid item>
        <img
          alt="group_image"
          srcSet={`${group_image} 500w`}
          sizes="(min-width: 1450px) 740px, (min-width: 1200px) 590px, (min-width: 900px) 430px, (min-width: 600px) 280px, 220px"
        ></img>
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
      <Grid item>
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
      >
        {imgAlertItem()}

        <Grid
          item
          container
          sm={5}
          xs={10}
          gap="45px"
          display="flex"
          justifyContent="center"
          mb="75px"
        >
          {topText()}

          {/*-----------Grid item for bottom text & swipe button----------------*/}
          <Grid item xs={9}>
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

function homeTheme() {
  const theme = createTheme();

  theme.typography.h1 = {
    "@media (width < 600px)": {
      fontSize: "23px",
    },
    "@media (min-width:600px)": {
      fontSize: "20px",
    },
    "@media (min-width:900px)": {
      fontSize: "31px",
    },
    "@media (min-width:1200px)": {
      fontSize: "42px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "55px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "64px",
    },
  };

  theme.typography.h2 = {
    "@media (width < 600px)": {
      fontSize: "20px",
    },
    "@media (min-width:600px)": {
      fontSize: "13px",
    },
    "@media (min-width:900px)": {
      fontSize: "23px",
    },
    "@media (min-width:1200px)": {
      fontSize: "25px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "38px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "42px",
    },
  };

  theme.typography.button = {
    "@media (width < 600px)": {
      fontSize: "13px",
    },
    "@media (min-width:600px)": {
      fontSize: "10px",
    },
    "@media (min-width:900px)": {
      fontSize: "15px",
    },
    "@media (min-width:1000px)": {
      fontSize: "16px",
    },
    "@media (min-width: 1536px)": {
      fontSize: "21px",
    },
    "@media (min-width: 2000px)": {
      fontSize: "30px",
    },
  };
  return theme;
}