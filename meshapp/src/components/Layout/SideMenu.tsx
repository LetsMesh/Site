import React from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import {
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  Receipt as ProfileIcon,
  Inbox as MessagingIcon,
  People as SwipingIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ContactSupport,
  ExpandLess,
  ExpandMore,
  Info as InfoIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAccountContext } from "src/contexts/UserContext";
import { FlexBetween } from "src/components/ui/FlexBetween";
import { ThemeSwitch } from "src/components/ThemeSwitch";
import { paths } from "src/routes/route-paths";
import { BASE_URL } from "src/config/axios-config";

interface MenuDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

const drawerWidth = 250;

type ListItemTypes = {
  text: String;
  Icon: React.ElementType;
  handleDrawerClose: () => void;
  path?: String;
  isExpand?: boolean;
  onExpandClick?: () => void;
};

// TODO: (#258) Add routes to each menu item when routing is implemented
const ListItemComponent = ({
  text,
  Icon,
  path,
  isExpand,
  onExpandClick,
  handleDrawerClose,
}: ListItemTypes) => {
  const location = useLocation(); // Get current location
  const isActive = path && path === location.pathname; // Check if current path matches

  return (
    <ListItem
      component={({ innerRef, ...props }) => (
        <RouterLink {...props} to={path} />
      )}
    >
      <ListItemButton
        sx={{
          borderBottom: "1px solid",
          borderColor: "text.secondary",
          padding: "4px 8px",
          backgroundColor: isActive ? "primary.light" : "inherit", // Highlight if active
          borderRadius: "6px 6px 0 0",
        }}
      >
        <ListItemIcon
          sx={{
            color: "text.primary",
            marginRight: "-16px", // Adjust this value to change the gap
          }}
          onClick={handleDrawerClose}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ color: "text.primary" }}
          primary={text}
          onClick={handleDrawerClose}
        />
        {onExpandClick &&
          (isExpand !== null && isExpand === true ? (
            <ExpandLess
              sx={{ color: "text.primary" }}
              onClick={onExpandClick}
            />
          ) : (
            <ExpandMore
              sx={{ color: "text.primary" }}
              onClick={onExpandClick}
            />
          ))}
      </ListItemButton>
    </ListItem>
  );
};

const SideMenuDrawer: React.FC<MenuDrawerProps> = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}) => {
  const { account } = useAccountContext();

  const [homeOpen, setHomeOpen] = React.useState(false);
  const toggleHome = () => {
    setHomeOpen(!homeOpen);
  };

  const navigate = useNavigate();

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
              {/* Top Content (Notifications Button, Theme Switch, and Close Button) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "text.primary",
                  padding: "16px 8px 0 16px",
                }}
              >
                <FlexBetween>
                  <div style={{ flexGrow: account ? 0 : 1 }}>
                    {account && (
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
              {/* Navigation tabs
                - Home (includes a drop down select for `About Us` and `Contact Us` pages)
                - Profile
                - Messaging
                - Swiping
              */}
              <div style={{ flexGrow: 1 }}></div>
              <List sx={{ color: "text.secondary", padding: "0" }}>
                {/* Home navigation (can be expanded to more navigations links) */}
                <ListItemComponent
                  text="Home"
                  Icon={HomeIcon}
                  path={paths.home}
                  onExpandClick={toggleHome}
                  isExpand={homeOpen}
                  handleDrawerClose={handleDrawerClose}
                />
                <Collapse in={homeOpen} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    sx={{ paddingLeft: "16px" }}
                  >
                    <ListItemComponent
                      text="About Us"
                      Icon={InfoIcon}
                      path="/about-us"
                      handleDrawerClose={handleDrawerClose}
                    />
                    <ListItemComponent
                      text="Contact Us"
                      Icon={ContactSupport}
                      path="/contact-us"
                      handleDrawerClose={handleDrawerClose}
                    />
                  </List>
                </Collapse>
                {/* Display the `Sign In` button if the user is not logged in,  otherwise, display the nagivation components */}
                {account ? (
                  <>
                    <ListItemComponent
                      text="Profile"
                      Icon={ProfileIcon}
                      path={paths.profile_page}
                      handleDrawerClose={handleDrawerClose}
                    />
                    <ListItemComponent
                      text="Messaging"
                      Icon={MessagingIcon}
                      path={paths.messages}
                      handleDrawerClose={handleDrawerClose}
                    />
                    <ListItemComponent
                      text="Swiping"
                      Icon={SwipingIcon}
                      path={paths.profile_swipe}
                      handleDrawerClose={handleDrawerClose}
                    />
                  </>
                ) : (
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={() => {
                        navigate(paths.login_page);
                        handleDrawerClose();
                      }}
                    >
                      Sign in
                    </Button>
                  </ListItem>
                )}
              </List>
            </div>
            {/* Bottom Content 
            - Settings page navigation
            - Logout button
            */}
            {account && (
              <div>
                <List sx={{ marginTop: "auto", padding: "0" }}>
                  {/* setting navigation */}
                  <ListItemComponent
                    text="Settings"
                    Icon={SettingsIcon}
                    path={paths.settings}
                    handleDrawerClose={handleDrawerClose}
                  />
                  {/* logout button */}
                  <ListItem>
                    <ListItemButton
                      sx={{
                        borderBottom: "1px solid",
                        borderColor: "text.secondary",
                        padding: "4px 8px",
                      }}
                      onClick={() =>
                        (window.location.href = `${BASE_URL}/auth/logout/`)
                      }
                    >
                      <ListItemIcon
                        sx={{
                          color: "text.primary",
                          marginRight: "-16px", // Adjust this value to change the gap
                        }}
                      >
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ color: "text.primary" }}
                        primary={"Logout"}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            )}
          </div>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default SideMenuDrawer;
