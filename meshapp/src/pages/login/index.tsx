import { Button, Divider, Grid, Skeleton, Typography } from "@mui/material";

import { paths } from "../../routing/RoutePaths";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginWindow from "../../components/LoginWindow";
import { GridContainer, GridItem } from "../../components/resuables/Grids";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="column"
      spacing={5}
      sx={{ textAlign: "center", alignItems: "center" }}
    >
      <Grid item xs>
        <Typography variant="h2" fontWeight={"bold"}>
          Don't have an account with us yet?
        </Typography>
      </Grid>
      <Grid item xs>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(paths.sign_up)}
        >
          {"Sign Up >"}
        </Button>
      </Grid>
      <GridItem sx={{ alignSelf: "stretch" }}>
        <Skeleton variant="rounded" height={"15em"} width={"100%"} />
      </GridItem>
    </Grid>
  );
};

const Login = () => {
  return (
    <GridContainer bgcolor="primary.main">
      <GridContainer
        // wrap="nowrap"
        spacing={5}
        p={2}
        sx={{
          boxShadow: 10,
          margin: "5em auto",
          width: "90%",
          bgcolor: "cardBackground.main",
          color: "text.primary",
          borderRadius: "15px",
        }}
      >
        <Grid item xs>
          <SignUp />
        </Grid>
        <Grid item xs={1} sx={{ alignSelf: "stretch" }}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs>
          <LoginWindow />
        </Grid>
      </GridContainer>
    </GridContainer>
  );
};

export default Login;
