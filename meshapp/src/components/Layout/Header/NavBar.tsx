import React from "react";
import { AppBar, AppBarProps, Toolbar } from "@mui/material";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeSwitch } from "./ThemeSwitch";
import { BrandingLogo } from "./Branding";
import { FlexBetween } from "../../resuables/FlexBetween";

export const NavBar: React.FC<AppBarProps> = () => {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: "fixed",
      }}
    >
      {/* For desktop */}
      <Toolbar
        sx={{
          justifyContent: "space-between",
          zIndex: 2,
        }}
      >
        <React.Fragment>
          {/* LEFT SIDE */}
          <BrandingLogo />
          {/* <NavLinks user={user} /> */}

          {/* RIGHT SIDE */}
          <FlexBetween>
            <ThemeSwitch />
            <Button
              sx={{ display: { xs: "none", md: "flex" } }}
              color="success"
              variant="contained"
              // onClick={() => (window.location.href = `${API_URL}/auth/login`)}
            >
              Sign in
            </Button>

            {/* mobile menu */}
            {/* <MobileMenu user={user} /> */}
          </FlexBetween>
        </React.Fragment>
      </Toolbar>
    </AppBar>
  );
};
