import WelcomeMessage from "./components/WelcomeMessage";
import AdvertisementSection from "./components/Advertisement";
import ReviewsSection from "./components/Reviews";
import {
  GridContainer,
  GridItem,
} from "../../../../components/resuables/Grids";
import LoginWindow from "../../../../components/LoginWindow";

import { Box, useTheme } from "@mui/material";

const LoggedOutHome = () => {
  const theme = useTheme();
  return (
    <GridContainer sx={{ margin: "0", padding: "0px", color: "text.main" }}>
      {/*-------------------------------Login Bubble--------------------------------------*/}
      <GridContainer
        sx={{
          padding: "20px 16px", // default padding for the smallest screens
          [theme.breakpoints.up("md")]: {
            padding: "20px 5%", // padding for medium screens and up
          },
          width: "100%",
          gap: "10px",
        }}
      >
        <GridItem
          container
          direction="column"
          rowGap={2}
          alignItems="center"
          alignSelf="center"
          p={0}
          md
          lg
          sx={{ padding: { lg: "0 100px", xs: "0 16px" } }}
        >
          <WelcomeMessage />
        </GridItem>
        <GridItem
          container
          xs={12}
          md={6}
          lg={4}
          direction="column"
          alignItems="center"
        >
          <Box
            sx={{
              backgroundColor: "cardBackground.main",
              borderRadius: "16px",
              padding: "20px 10px",
              filter: "drop-shadow(4px 4px 3px rgba(0,0,0,.6))",
              width: "100%",
              maxWidth: "360px",
            }}
          >
            <LoginWindow />
          </Box>
        </GridItem>
      </GridContainer>
      {/*-----------------------Advertisement Section-------------------------------------*/}
      <GridItem sx={{ padding: "10px 0" }} bgcolor={"cardBackground.main"}>
        <AdvertisementSection />
      </GridItem>
      {/*----------------------------Review Section-----------------------------------------*/}
      <ReviewsSection />
    </GridContainer>
  );
};

export default LoggedOutHome;
