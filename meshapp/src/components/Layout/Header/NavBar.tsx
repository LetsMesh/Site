import React from "react";
import {
  AppBar,
  AppBarProps,
  Toolbar,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Button } from "@mui/material";
import { ThemeSwitch } from "./ThemeSwitch";
import { BrandingLogo } from "../../BrandingLogo";
import { FlexBetween } from "../../resuables/FlexBetween";
import { useAccount } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import MenuDrawer from "../SideDrawer";

export const NavBar: React.FC<AppBarProps> = () => {
  const navigate = useNavigate();
  const { accountID } = useAccount();

  // drawer (side menu) open state
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
              sx={{ display: { xs: "flex", md: accountID ? "flex" : "none" } }}
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
              {accountID && (
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
                display: { xs: "none", md: accountID ? "none" : "flex" },
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
              {accountID === null && (
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
      <MenuDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
    </>
  );
};
