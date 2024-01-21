import { Box, Toolbar } from "@mui/material";
import { NavBar } from "./Header/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

export const PageLayout = () => {
  return (
    <Box width="100%" height="100%">
      <Box>
        <NavBar />
        <Toolbar />
        <Outlet />
        {/*Message and Footer Routes*/}
        <Footer />
      </Box>
    </Box>
  );
};
