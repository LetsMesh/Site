import { Routes, Route } from "react-router-dom";
import { paths } from "./route-paths";
import LoggedInMessage from "../components/Footer/LoggedInMessage";
import Footer from "../components/Footer/Footer";

//Paths for logged in page
//should display message icon at bottom of page if logged in, otherwise not
//and then the footer with links
const LOGGED_IN_PATHS = [
  paths.logged_in_home,
  paths.profile_page,
  paths.profile_swipe,
];

//contains routes that if you are logged in, will show messages at bottom of screen with Footer
//otherwise, just footer is displayed
export default function MessageAndFooterRoutes() {
  return (
    <>
      <Footer />
      <Routes>
        {LOGGED_IN_PATHS.map((path) => (
          <Route path={path} element={<LoggedInMessage />} />
        ))}
      </Routes>
    </>
  );
}
