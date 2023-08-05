import { Routes, Route } from "react-router-dom";
import { paths } from "./RoutePaths";
import LoggedInFooter from "../components/Footer/LoggedInFooter";
import LoggedOutFooter from "../components/Footer/LoggedOutFooter";

//Paths to render in either the logged in header or logged out footer
const LOGGED_IN_PATHS = [
  paths.logged_in_home,
  paths.profile_page,
  paths.profile_swipe,
];
const LOGGED_OUT_PATHS = [
  paths.logged_out_home,
  paths.login_page,
  paths.forgot_password,
  paths.sign_up,
];

//contains routes for the footer
export default function FooterRoutes() {
  return (
    <Routes>
      {LOGGED_IN_PATHS.map((path) => (
        <Route path={path} element={<LoggedInFooter />} />
      ))}
      {LOGGED_OUT_PATHS.map((path) => (
        <Route path={path} element={<LoggedOutFooter />} />
      ))}
    </Routes>
  );
}
