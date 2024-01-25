import { Box } from "@mui/material";
import { NavBar } from "./Header/NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import TwoFactorAuthReminders from "../two-factor-reminder/two-factor-reminder";
import MessageBar from "../MessageBar";
import ScrollToTop from "./ScrollToTop";
import { useAccountContext } from "../../contexts/UserContext";
import LoadingProgress from "../resuables/LoadingProgress";
import { useEffect } from "react";
import {
  logged_in_paths,
  logged_out_paths,
  paths,
} from "../../routing/RoutePaths";

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
