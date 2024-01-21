import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import React from "react";

export default function LoggedInFooter() {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "secondary.main", bottom: 0 }}
      elevation={0}
    >
      <Toolbar>
        <Grid container display="flex" justifyContent="right">
          <IconButton>
            <EmailIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
