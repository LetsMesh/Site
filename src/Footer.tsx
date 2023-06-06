// need to convert to typescript

import React from "react";
// import {
//   Box,
//   Container,
//   Row,
//   Column,
//   FooterLink,
//   Heading,
// } from "./FooterStyles"
import {
  Grid,
  Link,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
document.body.style.color = "black";

const Footer = () => {
  let theme = createTheme({
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            color: "black",
            fontSize: '11px',
            fontWeight:"600",
            "&:hover": {
              color: "#1db272",
              transition: "200ms ease-in",
            },
          },
        },
      },
    },
    typography:{
        h1:{
            fontWeight:"600",
            fontSize: "20px",
            lineHeight: "20px"
        },
        h2:{
            textDecoration:"underline",
            fontSize:"13px",
            fontWeight:"600",

        },
        h3:{
            fontSize:"13px",
            fontWeight:"400",
        }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {/*footer*/}
      <Grid container direction="column" xs={12} sx={{ background: "#F2E8DE" }}>
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
            <Typography color="#1DB272" variant="h1">Mesh</Typography>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-around"
            xs={11}
            sm={6}
            sx={{ flexWrap: "nowrap"}}
          >
            <Stack direction="column" rowGap={1}>
              <Typography variant="h2">General</Typography>
              <Link href="">home</Link>
              <Link href="">about</Link>
              <Link href="">sign up</Link>
              <Link href="">login</Link>
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
          sx={{ flexWrap: "nowrap", background: "white" }}
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Grid item>
            <Typography color="#26383A" variant="h3">Mesh is a part of Let's Mesh @ 2023</Typography>
          </Grid>
          <Grid item>
            <Typography color="#26383A" variant="h3">This is not a real product</Typography>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Footer;
