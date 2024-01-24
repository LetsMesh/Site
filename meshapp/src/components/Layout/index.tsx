import { Box } from "@mui/material";
import { NavBar } from "./Header/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import TwoFactorAuthReminders from "../two-factor-reminder/two-factor-reminder";
import MessageBar from "../MessageBar";

export const PageLayout = () => {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        bgcolor: "primary.main",
      }}
    >
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
