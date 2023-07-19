import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import SideMenu from "./SideMenu";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "primary.main" }}
      elevation={0}
    >
      <Toolbar>
        {/*---Left Side Menu Elements (Menu/Notification Icon)---*/}
        <SideMenu />

        {/*---Logo---*/}
        <Grid container justifyContent={"flex-end"}>
          <Typography
            sx={{
              color: "#F2E8DE",
              fontSize: "48px",
              fontFamily: "cocogoose",
              fontWeight: 600,
            }}
          >
            mesh
          </Typography>

          {/*---Icon goes here---*/}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
