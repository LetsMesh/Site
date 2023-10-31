import LoggedOutPage from "../home/logged-out/home";
import SignUp from "../components/SignUp/SignUp";
import Login from "../home/login";
import Otp from "../home/otp";
import ForgotPassword from "../components/password-forms/forgot-password-form";
import LoggedInHome from "../home/logged-in/LoggedInHome";
import ProfilePage from "../profile/profile-page";
import { exampleProfile } from "../profile/tests/profile-examples";
import Slider from "../ProfileCardCarousel/Swiper";
import { Routes, Route, Link } from "react-router-dom";
import { paths } from "./RoutePaths";
import ThemeToggleSwitch from "../theme/ThemeToggle";

//contains routes for the main page
export default function MainPageRoutes() {
  return (
    <Routes>
      {/*Logged Out Pages*/}
      <Route path={paths.logged_out_home} element={<LoggedOutPage />} />
      <Route path={paths.sign_up} element={<SignUp />} />
      <Route path={paths.login_page} element={<Login />} />
      <Route path={paths.otp} element={<Otp />} />
      <Route path={paths.forgot_password} element={<ForgotPassword />} />
      {/*Logged In Pages*/}
      <Route path={paths.logged_in_home} element={<LoggedInHome />} />
      <Route
        path={paths.profile_page}
        element={<ProfilePage {...exampleProfile} />}
      />
      <Route path={paths.profile_swipe} element={<Slider />} />
      {/*Temporary page to hold theme toggle switch*/}
      <Route
        path={paths.settings}
        element={
          <div
            style={{
              display: "flex",
              marginTop: "100px",
              justifyContent: "center",
            }}
          >
            <ThemeToggleSwitch />
          </div>
        }
      />
      {/*default route*/}
      <Route path="*" element={<Nav />} />
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
      <Link to={paths.logged_out_home}>Logged Out Home</Link>
      <Link to={paths.sign_up}>Sign Up</Link>
      <Link to={paths.login_page}>Login Page</Link>
      <Link to={paths.forgot_password}>Forgot Password</Link>
      <Link to={paths.logged_in_home}>Logged In Home</Link>
      <Link to={paths.profile_page}>Profile Page</Link>
      <Link to={paths.profile_swipe}>Profile Swipe</Link>
      <Link to={paths.settings}>Settings</Link>
    </div>
  );
}
