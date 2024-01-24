import { Box, Toolbar, styled } from "@mui/material";
import { NavBar } from "./Header/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import TwoFactorAuthReminders from "../../two-factor-auth/two-factor-reminder";

export const PageLayout = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        <NavBar />
        <Toolbar />
        <TwoFactorAuthReminders />
        <Outlet />
        {/*Message and Footer Routes*/}
        <Footer />
      </Box>
    </Box>
  );
};
