import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/TableRows";
import NotificationsIcon from "@mui/icons-material/Notifications";

import React from "react";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "primary.main" }}
      elevation={0}
    >
      <Toolbar>
        {/*---Left Side Menu Elements (Menu/Notification Icon)---*/}
        <Grid container>
          <IconButton sx={{ mr: 2, color: "action.active" }}>
            <MenuIcon sx={{ fontSize: "40px" }} />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "action.active" }}
          >
            <NotificationsIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </Grid>

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
