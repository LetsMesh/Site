import {
  Grid,
  Link,
  Stack,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { paths } from "../../Routing/RoutePaths";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  let textTheme = createTheme({
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: "600",
            color: "inherit",
            "&:hover": {
              filter: "brightness(2)",
              transition: "200ms ease-in",
            },
          },
        },
      },
    },
    typography: {
      h1: {
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "20px",
      },
      h2: {
        textDecoration: "underline",
        fontSize: "13px",
        fontWeight: "600",
      },
      h3: {
        fontSize: "13px",
        fontWeight: "400",
      },
    },
  });

  return (
    <ThemeProvider
      theme={(theme: Theme) => {
        return createTheme(theme, {
          components: {
            ...theme.components,
            MuiLink: {
              ...(textTheme.components !== undefined
                ? textTheme.components.MuiLink
                : undefined),
            },
          },
          typography: {
            ...theme.typography,
            h1: {
              ...textTheme.typography.h1,
            },
            h2: {
              ...textTheme.typography.h2,
            },
            h3: {
              ...textTheme.typography.h3,
            },
          },
        });
      }}
    >
      {/*footer*/}
      <Grid
        container
        direction="column"
        xs={12}
        sx={{ backgroundColor: "secondary.main" }}
      >
        {/*footer logo and links container*/}
        <Grid
          container
          display="flex"
          direction="row"
          justifyContent="space-between"
          rowGap={2}
          xs={12}
          p={2}
        >
          <Grid item>
            <Typography color="footerLogoColor.main" variant="h1">
              Mesh
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-around"
            xs={11}
            sm={6}
            sx={{ flexWrap: "nowrap" }}
            color="text.main"
          >
            {/**
             * @TODO : add actual links to the link elements (https://github.com/LetsMesh/Site/issues/191)
             * */}
            <Stack direction="column" rowGap={1}>
              <Typography variant="h2">General</Typography>
              <Link component={RouterLink} to={paths.logged_out_home}>
                home
              </Link>
              <Link href="">about</Link>
              <Link component={RouterLink} to={paths.sign_up}>
                sign up
              </Link>
              <Link component={RouterLink} to={paths.login_page}>
                login
              </Link>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <Typography variant="h2">Contact Us</Typography>
              <Link href="">Organization</Link>
              <Link href="">Project Site</Link>
              <Link href="">Discord Inv</Link>
              <Link href="">Report Bug</Link>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <Typography variant="h2">Related Links</Typography>
              <Link href="">Myspace</Link>
              <Link href="">Hotline</Link>
              <Link href="">More Ram</Link>
              <Link href="">Leetcode</Link>
            </Stack>
          </Grid>
        </Grid>
        {/*footer copyright */}
        <Grid
          container
          direction="row"
          sx={{ flexWrap: "nowrap", backgroundColor: "cardBackground.main" }}
          justifyContent="space-between"
          alignItems="center"
          p={2}
          color="text.main"
        >
          <Grid item>
            <Typography variant="h3">
              Mesh is a part of Let's Mesh @ 2023
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">This is not a real product</Typography>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Footer;
