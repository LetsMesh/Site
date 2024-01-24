import { Grid, Stack } from "@mui/material";

import ImageGraphic from "./components/ImageGraphic";
import AlertBox from "./components/AlertBox";
import { GridContainer } from "../../../../components/resuables/Grids";
import WelcomeMessage from "./components/WelcomeMessage";

const LoggedInHome = () => {
  return (
    <>
      <GridContainer
        justifyContent="center"
        alignItems="center"
        p={{ lg: 10, md: 10, xs: 5 }}
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
};

export default LoggedInHome;
