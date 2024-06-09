import React from "react";

import {
  Alert,
  Box,
  Button,
  Grid,
  Stack,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { GridContainer } from "src/components/ui/Grid";
import { ChevronRight, ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/route-paths";
import group_image from "src/assets/media/group_image.png";
export default function LoggedInHome() {
  return (
    <>
      <GridContainer
        justifyContent="center"
        alignItems="center"
        p={{ lg: 10, md: 10, xs: 5 }}
        sx={{ margin: "auto auto" }}
      >
        {/* For lg and md screens */}
        <Grid
          item
          md={6}
          lg={6}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <Stack direction="column" spacing={2}>
            <ImageGraphic />
            <AlertBox />
          </Stack>
        </Grid>
        <Grid
          item
          md={6}
          lg={6}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          <WelcomeMessage />
        </Grid>

        {/* For sm and xs screens */}
        <Grid item xs={12} display={{ xs: "block", md: "none" }}>
          <Stack direction="column" spacing={2}>
            <ImageGraphic />
            <WelcomeMessage />
            <AlertBox />
          </Stack>
        </Grid>
      </GridContainer>
    </>
  );
}

const AlertBox = () => {
  return (
    <Alert severity="error" icon={<ErrorOutline sx={{ fontSize: "4vh" }} />}>
      <Stack spacing={1} direction="column" flexWrap="wrap">
        <Typography fontSize={"16px"}>
          <strong>Notice</strong>
        </Typography>
        <Typography fontSize={"14px"}>
          Please update your profile with the following items:
          <br /> - Biography
          <br /> - Years of Experience
          <br /> - Career
          <br /> - Interests
        </Typography>
      </Stack>
    </Alert>
  );
};

const ImageGraphic = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      bgcolor="#CCCCCC"
      width={"100%"}
    >
      <img
        alt="group_image"
        srcSet={`${group_image} 500w`}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "auto",
        }}
      />
    </Box>
  );
};

const WelcomeMessage = () => {
  const navigate = useNavigate();
  return (
    <Stack justifyContent="center" alignItems="center" gap="45px">
      <Typography
        color="#F2E8DE"
        fontFamily="cocogoose"
        fontWeight="700"
        fontSize="36px"
        textAlign="center"
      >
        Find Your Perfect Mentor or Mentee with Mesh
      </Typography>
      <Typography
        color="#F2E8DE"
        fontFamily="cocogoose"
        textAlign="center"
        fontSize="24px"
      >
        Unlock Your Potential with Expert Guidance and Support.
      </Typography>
      <Button
        variant="contained"
        color="success"
        sx={{
          width: "14em",
          height: "3em",
          borderRadius: 4,
          fontWeight: "bold",
          fontFamily: "cocogoose",
        }}
        onClick={() => navigate(paths.profile_swipe)}
        endIcon={<ChevronRight />}
      >
        {`Start Swiping`}
      </Button>
    </Stack>
  );
};
