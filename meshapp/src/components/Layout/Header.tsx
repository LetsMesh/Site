import React from "react";
import {
  AppBar,
  AppBarProps,
  Toolbar,
  Typography,
  Link,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { useAccountContext } from "src/contexts/UserContext"; // Context for account information
import { FlexBetween } from "src/components/ui/FlexBetween";
import { ThemeSwitch } from "src/components/ThemeSwitch";

import { BrandingLogo } from "src/components/BrandingLogo";
import SideMenuDrawer from "./SideMenu";

const Header: React.FC<AppBarProps> = () => {
  const navigate = useNavigate();
  const { account } = useAccountContext(); // Get the current account context

  // State for managing the side menu drawer's open/close state
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <AppBar
        sx={{
          position: "fixed",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={(theme) => ({
            p: "4px 24px",
            justifyContent: "space-between",
            zIndex: 2,
            bgcolor: theme.palette.primary.main,
          })}
        >
          <>
            <FlexBetween
              sx={{ display: { xs: "flex", md: account ? "flex" : "none" } }}
            >
              <IconButton
                onClick={handleDrawerOpen}
                sx={{
                  color: "text.primary",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {account && (
                <IconButton
                  sx={{
                    color: "text.primary",
                    ...(open && { display: "none" }),
                  }}
                >
                  <NotificationsIcon />
                </IconButton>
              )}
              <ThemeSwitch />
            </FlexBetween>

            <BrandingLogo />

            <FlexBetween
              gap={"16px"}
              sx={{
                display: { xs: "none", md: account ? "none" : "flex" },
              }}
            >
              <FlexBetween gap={"16px"}>
                <Link href="/">
                  <Typography
                    fontSize={"30px"}
                    color={"#F2E8DE"}
                    fontFamily={"cocogoose"}
                    sx={{ textDecoration: "underline" }}
                  >
                    home
                  </Typography>
                </Link>
                <Link href="/about-us">
                  <Typography
                    fontSize={"30px"}
                    color={"#F2E8DE"}
                    fontFamily={"cocogoose"}
                    sx={{ textDecoration: "underline" }}
                  >
                    about us
                  </Typography>
                </Link>
              </FlexBetween>
              <ThemeSwitch />
              {account === null && (
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </Button>
              )}
            </FlexBetween>
          </>
        </Toolbar>
      </AppBar>
      <SideMenuDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
    </>
  );
};

export default Header;
