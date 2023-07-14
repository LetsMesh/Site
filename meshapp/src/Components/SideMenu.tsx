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

type ListItemTypes = { text: String; icon: JSX.Element };

// TODO: Add routes to each menu item when routing is implemented
const ListItemComponent = ({ text, icon }: ListItemTypes) => (
  <ListItem>
    <ListItemButton sx={{ borderBottom: "1px solid gray" }}>
      <ListItemIcon sx={{ color: "gray" }} style={{ fontSize: 40 }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ color: "gray", fontSize: 20 }}
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
      <List sx={{ color: "gray" }}>
        <ListItemComponent text="Home" icon={<HomeIcon />} />
        <ListItemComponent text="Profile" icon={<ProfileIcon />} />
        <ListItemComponent text="Messaging" icon={<MessagingIcon />} />
        <ListItemComponent text="Swiping" icon={<SwipingIcon />} />
      </List>
      <List sx={{ marginTop: "auto" }}>
        <ListItemComponent text="Settings" icon={<SettingsIcon />} />
        <ListItemComponent text="Logout" icon={<LogoutIcon />} />
      </List>
    </>
  );

  return (
    <>
      <Grid container>
        <IconButton sx={{ mr: 2, color: "#0000008F" }}>
          <MenuIcon sx={{ fontSize: "40px" }} onClick={toggleDrawer} />
          <Drawer
            hideBackdrop
            variant="persistent"
            open={open}
            onClose={toggleDrawer}
            PaperProps={{
              sx: { backgroundColor: "#F2E8DE", color: "black", width: 250 },
            }}
            sx={{ zIndex: -1 }}
          >
            <Toolbar sx={{ backgroundColor: "#F2E8DE", padding: 2 }} />
            <MenuList />
          </Drawer>
        </IconButton>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, color: "#0000008F" }}
        >
          <NotificationsIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </Grid>
    </>
  );
}
