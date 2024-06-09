// src/components/Layout/index.tsx

import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAccountContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import {
  logged_in_paths,
  logged_out_paths,
  paths,
} from "src/routes/route-paths";
import LoadingProgress from "../ui/LoadingSpinner";
import TwoFactorAuthReminders from "src/components/TwoFactorAuth/TwoFactorReminder";

import Footer from "./Footer";
import Header from "./Header";
import MessageBar from "../Messages/MessageBar";

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
      <Box>
        <Header />
        <TwoFactorAuthReminders />
        <Box sx={{ minHeight: "90vh", paddingTop: "64px" }}>
          <Outlet />
        </Box>
        <Footer />
        <MessageBar />
      </Box>
    </Box>
  );
};
