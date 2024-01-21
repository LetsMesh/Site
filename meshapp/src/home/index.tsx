import { useState } from "react";
import LoggedOutHome from "./components/logged-out";
import LoggedInHome from "./components/logged-in";

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return loggedIn ? <LoggedInHome /> : <LoggedOutHome />;
};

export default HomePage;
