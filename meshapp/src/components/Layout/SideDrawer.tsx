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
import { Link as RouterLink, useLocation } from "react-router-dom";
import { paths } from "../../routing/RoutePaths";
import { useAccountContext } from "../../contexts/UserContext";
import { ThemeSwitch } from "./Header/ThemeSwitch";
import { FlexBetween } from "../resuables/FlexBetween";
import { BASE_URL } from "../../utils/axios/axiosConfig";

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
          (isExpand !== null && isExpand == true ? (
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

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}) => {
  const { account } = useAccountContext();

  const [homeOpen, setHomeOpen] = React.useState(false);
  const toggleHome = () => {
    setHomeOpen(!homeOpen);
  };

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
              <div style={{ flexGrow: 1 }}></div>
              <List sx={{ color: "text.secondary", padding: "0" }}>
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
                {account && (
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
                )}
              </List>
            </div>
            {/* Bottom Content */}
            {account && (
              <div>
                <List sx={{ marginTop: "auto", padding: "0" }}>
                  <ListItemComponent
                    text="Settings"
                    Icon={SettingsIcon}
                    path={paths.settings}
                    handleDrawerClose={handleDrawerClose}
                  />
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
                        primary={"logout"}
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

export default MenuDrawer;
