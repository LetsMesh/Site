import { Grid, Link, Typography } from "@mui/material";
import { paths } from "src/routes/route-paths";
import { Link as RouterLink } from "react-router-dom";
export default function LoggedOutHeader() {
  return (
    <Grid
      container
      direction="row"
      xs={12}
      sx={{ backgroundColor: "primary.main" }}
      p={"20px"}
      justifyContent={"flex-end"}
    >
      {/*contains the nav links*/}

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
          <Link component={RouterLink} to={paths.logged_out_home}>
            <Typography
              variant="h4"
              color={"#F2E8DE"}
              sx={{ textDecoration: "underline" }}
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
        <Grid item>{/*For Icon*/}</Grid>
      </Grid>
    </Grid>
  );
}
