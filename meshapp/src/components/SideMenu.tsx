import React from "react";
import {
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  TableRows as MenuIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  Receipt as ProfileIcon,
  Inbox as MessagingIcon,
  People as SwipingIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import { paths } from "src/routes/route-paths";
type ListItemTypes = { text: String; Icon: React.ElementType; path: String };

// TODO: (#258) Add routes to each menu item when routing is implemented
const ListItemComponent = ({ text, Icon, path }: ListItemTypes) => (
  <ListItem
    component={({ innerRef, ...props }) => <RouterLink {...props} to={path} />}
  >
    <ListItemButton
      sx={{ borderBottom: "1px solid", borderColor: "text.secondary" }}
    >
      <ListItemIcon sx={{ color: "text.secondary" }}>
        <Icon sx={{ fontSize: 40 }} />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ color: "text.secondary" }}
        primary={text}
      />
    </ListItemButton>
  </ListItem>
);

export default function SideMenu() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);
  const MenuList = () => (
    <>
      <List sx={{ color: "text.secondary" }}>
        <ListItemComponent
          text="Home"
          Icon={HomeIcon}
          path={paths.logged_in_home}
        />
        <ListItemComponent
          text="Profile"
          Icon={ProfileIcon}
          path={paths.profile_page}
        />
        <ListItemComponent text="Messaging" Icon={MessagingIcon} path={"/"} />
        <ListItemComponent
          text="Swiping"
          Icon={SwipingIcon}
          path={paths.profile_swipe}
        />
      </List>
      <List sx={{ marginTop: "auto" }}>
        <ListItemComponent text="Settings" Icon={SettingsIcon} path={"/"} />
        <ListItemComponent
          text="Logout"
          Icon={LogoutIcon}
          path={paths.logged_out_home}
        />
      </List>
    </>
  );

  return (
    <>
      <Grid container>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, color: "action.active" }}
          onClick={toggleDrawer}
        >
          <MenuIcon sx={{ fontSize: 40 }} />
        </IconButton>

        <Drawer
          hideBackdrop
          variant="persistent"
          open={open}
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              backgroundColor: "secondary.main",
              width: 250,
            },
          }}
          // Set zIndex to -1 so Hamburger and Notification icons are always on top
          sx={{ zIndex: -1 }}
        >
          <Toolbar />
          <MenuList />
        </Drawer>

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
    </>
  );
}
