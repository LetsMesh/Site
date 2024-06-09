import { Routes, Route } from "react-router-dom";
import { paths } from "./route-paths";
import LoggedInHeader from "../components/Header/LoggedInHeader";
import LoggedOutHeader from "../components/Header/LoggedOutHeader";
//Paths to render in either the logged in header or logged out header
//logged out home has its own unique header so leaving that out for now unless we refactor
const LOGGED_IN_PATHS = [
  paths.logged_in_home,
  paths.profile_page,
  paths.profile_swipe,
];
const LOGGED_OUT_PATHS = [
  //   paths.logged_out_home,
  paths.login_page,
  paths.forgot_password,
  paths.sign_up,
];

export default function HeaderRoutes() {
  return (
    <Routes>
      {LOGGED_IN_PATHS.map((path) => (
        <Route path={path} element={<LoggedInHeader />} />
      ))}
      {LOGGED_OUT_PATHS.map((path) => (
        <Route path={path} element={<LoggedOutHeader />} />
      ))}
    </Routes>
  );
}
