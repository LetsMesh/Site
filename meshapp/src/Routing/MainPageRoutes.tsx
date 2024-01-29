import SignUp from "../components/SignUp/SignUp";
import Login from "../pages/login";
import ForgotPassword from "../components/password-forms/forgot-password-form";
import ProfilePage from "../pages/profile/profile-page";
import { exampleProfile } from "../pages/profile/tests/profile-examples";
import Slider from "../pages/swiping/Swiper";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { paths } from "./RoutePaths";
import { PageLayout } from "../components/Layout";
import HomePage from "../pages/home";
import { Link } from "@mui/material";
import SettingPage from "../pages/setting";
import MessagePage from "../pages/messaging";

//contains routes for the main page
export default function MainPageRoutes() {
  return (
    <Routes>
      {/*default route*/}
      <Route element={<PageLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.sign_up} element={<SignUp />} />
        <Route path={paths.login_page} element={<Login />} />
        <Route path={paths.forgot_password} element={<ForgotPassword />} />
        <Route path={paths.settings} element={<SettingPage />} />
        <Route path={paths.messages} element={<MessagePage />} />
        <Route
          path={paths.profile_page}
          element={<ProfilePage {...exampleProfile} />}
        />
        <Route path={paths.profile_swipe} element={<Slider />} />
        <Route path="*" element={<Nav />} />
      </Route>
    </Routes>
  );
}

//just a component containing links to pages for demonstration
function Nav() {
  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <Link component={RouterLink} to={paths.home}>
        Home
      </Link>
      <Link component={RouterLink} to={paths.sign_up}>
        Sign Up
      </Link>
      <Link component={RouterLink} to={paths.login_page}>
        Login Page
      </Link>
      <Link component={RouterLink} to={paths.forgot_password}>
        Forgot Password
      </Link>
      <Link component={RouterLink} to={paths.profile_page}>
        Profile Page
      </Link>
      <Link component={RouterLink} to={paths.profile_swipe}>
        Profile Swipe
      </Link>
      {/* <Link component={RouterLink} to={paths.settings}>Settings</Link> */}
    </div>
  );
}
