import {
  Grid,
  Link,
  Stack,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { paths } from "src/routes/route-paths";
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
            <Stack direction="column" rowGap={1}>
              <Typography variant="h2">General</Typography>
              <Link component={RouterLink} to={paths.home}>
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
              <Link href="javascript:(function()%7Bjavascript:var%20s%3Ddocument.createElement(%27script%27)%3Bs.setAttribute(%27src%27,%27https://nthitz.github.io/turndownforwhatjs/tdfw.js%27)%3Bdocument.body.appendChild(s)%3B%7D)()%3B">
                Organization
              </Link>
              <Link href="https://media.discordapp.net/attachments/1047537587746766915/1061825879086473216/FHv3YOmWUAAj1yM.png?width=613&height=662">
                Project Site
              </Link>
              <Link href="https://www.amazon.com/How-Talk-Your-About-Safety/dp/045149492X/?tag=judgeabook-20">
                Discord Inv
              </Link>
              <Link href="https://media.tenor.com/ys-mxRCoXUQAAAAd/kitten-belly-dance.gif">
                Report Bug
              </Link>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <Typography variant="h2">Related Links</Typography>
              <Link href="https://twitter.com/ctrlshifti/status/1288745146759000064?lang=en">
                Myspace
              </Link>
              <Link href="https://media.tenor.com/7JNExCWqRtgAAAAC/lweo-yuyu.gif">
                Hotline
              </Link>
              <Link href="https://media.discordapp.net/attachments/953700110557151293/1019832403470057583/caption.gif">
                More Ram
              </Link>
              <Link href="https://media.tenor.com/6iq8JGtbYZ8AAAAd/cat-drag.gif">
                Leetcode
              </Link>
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
