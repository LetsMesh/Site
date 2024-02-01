// src/components/Layout/index.tsx

import { Box } from "@mui/material";
import { NavBar } from "./Header/NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import TwoFactorAuthReminders from "../two-factor-reminder/two-factor-reminder";
import MessageBar from "../Messages/MessageBar";
import ScrollToTop from "./ScrollToTop";
import { useAccountContext } from "../../contexts/UserContext";
import LoadingProgress from "../resuables/LoadingProgress";
import { useEffect } from "react";
import {
  logged_in_paths,
  logged_out_paths,
  paths,
} from "../../routing/RoutePaths";

/**
 * ### PageLayout Component
 *
 * The PageLayout component is responsible for rendering the overall layout of the web application.
 * It includes the navigation bar (NavBar), a two-factor authentication reminder (TwoFactorAuthReminders),
 * the main content area where different pages are rendered (Outlet), a message bar (MessageBar), and a footer (Footer).
 *
 * This component also manages navigation redirects based on the user's authentication state. It ensures that
 * authenticated users are redirected away from pages meant for unauthenticated users and vice versa.
 *
 * The layout uses a Box component from MUI, styled to take the full width and height of the viewport,
 * with a primary background color.
 *
 * #### Props:
 * - None
 *
 * #### Dependencies:
 * - React Router's `useNavigate` and `useLocation` hooks for navigation and location details.
 * - `useAccountContext` from `../../contexts/UserContext` to access the user's account details and loading state.
 * - `NavBar`, `TwoFactorAuthReminders`, `MessageBar`, `Footer` components for various sections of the layout.
 * - `ScrollToTop` component to handle scrolling to the top of the page on navigation.
 * - `LoadingProgress` component to display a loading indicator.
 * - `logged_in_paths`, `logged_out_paths`, `paths` from `../../routing/RoutePaths` for managing navigation based on authentication.
 */
export const PageLayout = () => {
  const { account, loadingState } = useAccountContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (loadingState === "completed") {
      if (logged_in_paths.includes(pathname) && !account) {
        navigate(paths.home);
      } else if (logged_out_paths.includes(pathname) && account) {
        navigate(paths.home);
      }
    }
  }, [account, loadingState, pathname, navigate]);

  if (loadingState !== "completed") {
    // Render only loading progress until the account context is loaded
    return <LoadingProgress />;
  }

  // Render the rest of the page layout once the account context is fully loaded
  return (
    <Box width="100%" height="100%" sx={{ bgcolor: "primary.main" }}>
      <ScrollToTop />
      <Box>
        <NavBar />
        <TwoFactorAuthReminders />
        <Box sx={{ minHeight: "90vh", paddingTop: "64px" }}>
          <Outlet />
        </Box>
        <MessageBar />
        <Footer />
      </Box>
    </Box>
  );
};
