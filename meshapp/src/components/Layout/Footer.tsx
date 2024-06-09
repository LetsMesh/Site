import {
  Box,
  Grid,
  Link,
  Stack,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { useAccountContext } from "src/contexts/UserContext";
import MeshLogo from "src/components/svgs/logo";
import { paths } from "src/routes/route-paths";
import { FlexBetween } from "src/components/ui/FlexBetween";

const Footer = () => {
  let textTheme = createTheme({
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            fontSize: "11px",
          },
        },
      },
    },
    typography: {
      h1: {
        fontFamily: "cocogoose",
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

  const { account } = useAccountContext();

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
        sx={
          {
            // ...(account && { marginBottom: "40px" }),
            // enable this when message bar is added (leaving bottom space for message bar when user is logged in)
          }
        }
      >
        {/*footer logo and links container*/}
        <Grid
          container
          display="flex"
          direction="row"
          justifyContent="space-between"
          p={2}
          sx={{ backgroundColor: "secondary.main" }}
        >
          <Grid item>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href={"/"}
                sx={{
                  color: "primary.main",
                  fontFamily: "cocogoose",
                  fontWeight: 600,
                  fontSize: "36px",
                  display: { xs: "flex", md: "flex" },
                  textDecoration: "none",
                }}
              >
                mesh
              </Typography>
              <MeshLogo sx={{ fontSize: "36px", color: "primary.main" }} />
            </Box>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-around"
            xs={11}
            sm={6}
            sx={{ flexWrap: "nowrap" }}
            color="text.primary"
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
                Discord Server
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

        <FlexBetween
          p={2}
          color="text.primary"
          sx={{ backgroundColor: "cardBackground.main" }}
        >
          <Typography variant="h3">
            Mesh is a part of Let's Mesh. All rights reserved. @ 2023 - 2024
          </Typography>
          <Typography variant="h3">This is not a real product</Typography>
        </FlexBetween>
      </Grid>
    </ThemeProvider>
  );
};
export default Footer;
