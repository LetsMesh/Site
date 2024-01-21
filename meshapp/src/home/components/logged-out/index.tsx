import WelcomeMessage from "./components/WelcomeMessage";
import AdvertisementSection from "./components/Advertisement";
import ReviewsSection from "./components/Reviews";
import { GridContainer, GridItem } from "../../../components/resuables/Grids";
import LoginWindow from "./components/Login";
import { Box } from "@mui/material";

const LoggedOutHome = () => {
  return (
    <GridContainer sx={{ margin: "0", padding: "0px" }}>
      {/*-------------------------------Login Bubble--------------------------------------*/}
      <GridContainer sx={{ padding: "20px 0" }}>
        <GridItem
          container
          direction="column"
          rowGap={2}
          alignItems="center"
          alignSelf="center"
          color="#F2E8DE"
          p={0}
          md
          lg
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
              width: "75%",
              minWidth: "360px",
              maxWidth: "400px",
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
