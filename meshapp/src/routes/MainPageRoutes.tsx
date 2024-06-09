import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { paths } from "./route-paths";
import { PageLayout } from "../components/Layout";
import HomePage from "../pages/Home/Page";
import { Link } from "@mui/material";
import SignUp from "src/pages/SignUp";
import Login from "src/pages/Login";
import PasswordReset from "src/components/AuthForms/ForgotPasswordForm";
import ProfilePage from "src/pages/Profiles/ProfilePage";
import { exampleProfile } from "src/pages/Profiles/tests/profile-examples";
import Swiper from "src/pages/Swiping";
import SettingPage from "src/pages/Settings/Page";

//contains routes for the main page
export default function MainPageRoutes() {
  return (
    <Routes>
      {/*default route*/}
      <Route element={<PageLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.sign_up} element={<SignUp />} />
        <Route path={paths.login_page} element={<Login />} />
        <Route path={paths.forgot_password} element={<PasswordReset />} />
        <Route path={paths.settings} element={<SettingPage />} />
        {/* <Route path={paths.messages} element={<MessagePage />} /> */}
        <Route
          path={paths.profile_page}
          element={<ProfilePage {...exampleProfile} />}
        />
        <Route path={paths.profile_swipe} element={<Swiper />} />
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
