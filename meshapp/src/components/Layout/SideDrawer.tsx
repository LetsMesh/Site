import * as React from "react";
import { useTheme } from "@mui/material/styles";

import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  Receipt as ProfileIcon,
  Inbox as MessagingIcon,
  People as SwipingIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { paths } from "../../Routing/RoutePaths";
import { useAccount } from "../../contexts/UserContext";
import { ThemeSwitch } from "./Header/ThemeSwitch";
import { FlexBetween } from "../resuables/FlexBetween";

interface MenuDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

const drawerWidth = 250;

type ListItemTypes = { text: String; Icon: React.ElementType; path: String };

// TODO: (#258) Add routes to each menu item when routing is implemented
const ListItemComponent = ({ text, Icon, path }: ListItemTypes) => (
  <ListItem
    component={({ innerRef, ...props }) => <RouterLink {...props} to={path} />}
  >
    <ListItemButton
      sx={{
        borderBottom: "1px solid",
        borderColor: "text.secondary",
        padding: "4px 8px",
      }}
    >
      <ListItemIcon sx={{ color: "text.primary" }}>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ color: "text.primary" }}
        primary={text}
      />
    </ListItemButton>
  </ListItem>
);

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}) => {
  const { accountID } = useAccount();

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <Box
          sx={{ width: drawerWidth, height: "100%" }}
          role="presentation"
          onKeyDown={handleDrawerClose}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              {/* Top Content */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",

                  color: "text.primary",
                  padding: "16px 8px 0 16px",
                }}
              >
                <FlexBetween>
                  <div style={{ flexGrow: accountID ? 0 : 1 }}>
                    {accountID && (
                      <IconButton
                        sx={{
                          color: "text.primary",
                        }}
                      >
                        <NotificationsIcon />
                      </IconButton>
                    )}
                  </div>
                  <ThemeSwitch />
                </FlexBetween>
                <Button
                  sx={{
                    color: "text.primary",
                  }}
                  startIcon={<ChevronLeftIcon />}
                  onClick={handleDrawerClose}
                >
                  Close
                </Button>
              </div>
              <div style={{ flexGrow: 1 }}></div>
              <List sx={{ color: "text.secondary", padding: "0" }}>
                <ListItemComponent
                  text="Home"
                  Icon={HomeIcon}
                  path={paths.home}
                />
                <ListItemComponent
                  text="Profile"
                  Icon={ProfileIcon}
                  path={paths.profile_page}
                />
                <ListItemComponent
                  text="Messaging"
                  Icon={MessagingIcon}
                  path={"/"}
                />
                <ListItemComponent
                  text="Swiping"
                  Icon={SwipingIcon}
                  path={paths.profile_swipe}
                />
              </List>
            </div>
            {/* Bottom Content */}
            <div>
              <List sx={{ marginTop: "auto", padding: "0" }}>
                <ListItemComponent
                  text="Settings"
                  Icon={SettingsIcon}
                  path={"/"}
                />
                <ListItemComponent
                  text="Logout"
                  Icon={LogoutIcon}
                  path={paths.home}
                />
              </List>
            </div>
          </div>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default MenuDrawer;
