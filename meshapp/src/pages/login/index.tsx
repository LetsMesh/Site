import {
  Button,
  Divider,
  Grid,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";

import { paths } from "../../routing/RoutePaths";
import { useNavigate } from "react-router-dom";
import LoginWindow from "../../components/LoginWindow";
import { GridContainer, GridItem } from "../../components/resuables/Grids";
import { useEffect } from "react";

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
  const navigate = useNavigate();

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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GridItem xs={5} sx={{ display: { xs: "none", md: "block" } }}>
          <SignUp />
        </GridItem>
        <GridItem
          xs={1}
          sx={{
            alignSelf: "stretch",
            display: { xs: "none", md: "block" },
          }}
        >
          <Divider orientation="vertical" />
        </GridItem>
        <GridItem
          xs
          sx={{
            padding: "40px 40px 0 40px",
            width: "100%",
            maxWidth: "360px",
          }}
        >
          <LoginWindow />
        </GridItem>
        <GridItem
          sx={{
            display: { xs: "block", md: "none" },
            padding: "40px 40px 0 40px",
            gap: "5px",
            textAlign: "center",
          }}
        >
          <Typography>
            Don't have an account with us yet?{" "}
            <Link
              onClick={() => navigate(paths.sign_up)}
              sx={{
                fontWeight: "700",
                cursor: "pointer",
                textDecoration: "underline",
                color: "text.primary",
              }}
            >
              {/* In this code, {'\u00A0'} is used to insert a non-breaking space between "Sign" and "up". 
              This will ensure that the entire "Sign up" text stays on the same line and wraps together when necessary. */}
              Sign{"\u00A0"}up
            </Link>
          </Typography>
        </GridItem>
        <GridItem
          sx={{
            alignSelf: "stretch",
            padding: "40px 40px 0 40px",
            display: { xs: "block", md: "none" },
          }}
        >
          <Skeleton variant="rounded" height={"15em"} width={"100%"} />
        </GridItem>
      </GridContainer>
    </GridContainer>
  );
};

export default Login;
