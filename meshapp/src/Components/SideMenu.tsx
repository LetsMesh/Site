import React from "react";
import {
  Box,
  Divider,
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
import NotificationsIcon from "@mui/icons-material/Notifications";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/TableRows";

export default function SideMenu() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);
  const MenuList = () => (
    <Box>
      <List>
        {["Home", "Profile", "Messaging", "Swiping"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
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
            PaperProps={{ sx: { backgroundColor: "white", color: "black" } }}
            sx={{ zIndex: -10 }}
          >
            <Toolbar sx={{ backgroundColor: "white" }} />
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
      {/* <Button onClick={toggleDrawer(anchor, true)}>
            <SideMenuButton color="action" />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer> */}
    </>
  );
}
