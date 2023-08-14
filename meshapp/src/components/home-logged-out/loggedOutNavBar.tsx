import { Typography, Grid, Link, Button } from "@mui/material";
import { paths } from "../../Routing/RoutePaths";
import { Link as RouterLink } from "react-router-dom";
//the nav bar for the logged out home page
export default function loggedOutNav() {
  return (
    <Grid
      container
      direction="row"
      xs={12}
      sx={{ backgroundColor: "primary.main" }}
      p={"20px"}
    >
      {/*contains the app name, need to add in image later*/}
      <Grid container item xs={1} md={3} alignItems={"flex-end"}>
        <Typography variant="h1" color={"#F2E8DE"}>
          mesh
        </Typography>
      </Grid>

      {/*contains the nav links and sign in button*/}

      <Grid
        item
        container
        xs={11}
        md={9}
        direction="row"
        justifyContent="flex-end"
        spacing={5}
      >
        <Grid item>
          <Link href="#">
            <Typography
              variant="h4"
              color={"#F2E8DE"}
              sx={{ textDecoration: "underline" }}
              component={RouterLink}
              to={paths.logged_out_home}
            >
              home
            </Typography>
          </Link>
        </Grid>

        <Grid item>
          <Link href="#">
            <Typography
              variant="h4"
              color={"#F2E8DE"}
              sx={{ textDecoration: "underline" }}
            >
              about us
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            sx={{
              padding: "6px 16px",
              "&:hover": {
                backgroundColor: "#0e977b",
              },
            }}
            component={RouterLink}
            to={paths.sign_up}
          >
            <Typography variant="button">Sign In</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
