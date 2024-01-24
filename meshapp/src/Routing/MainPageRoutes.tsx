import SignUp from "../components/SignUp/SignUp";
import Login from "../pages/login";
import ForgotPassword from "../components/password-forms/forgot-password-form";
import ProfilePage from "../profile/profile-page";
import { exampleProfile } from "../profile/tests/profile-examples";
import Slider from "../ProfileCardCarousel/Swiper";
import { Routes, Route, Link } from "react-router-dom";
import { paths } from "./RoutePaths";
import { PageLayout } from "../components/Layout";
import HomePage from "../pages/home";

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
        {/*Logged In Pages*/}
        {/* <Route path={paths.} element={<LoggedInHome />} /> */}
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
      }}
    >
      <Link to={paths.home}>Home</Link>
      <Link to={paths.sign_up}>Sign Up</Link>
      <Link to={paths.login_page}>Login Page</Link>
      <Link to={paths.forgot_password}>Forgot Password</Link>
      <Link to={paths.profile_page}>Profile Page</Link>
      <Link to={paths.profile_swipe}>Profile Swipe</Link>
      {/* <Link to={paths.settings}>Settings</Link> */}
    </div>
  );
}
