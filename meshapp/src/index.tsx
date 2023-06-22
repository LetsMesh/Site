import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./home/login";
import Footer from "./components/Footer";
import TwoFactorAuthReminders from "./two-factor-auth/two-factor-reminder";
import LoggedOutPage from "./home/logged-out/home";
import Slider from "./ProfileCardCarousel/Swiper";

import ProfilePage from "./profile/profile-page";
import { exampleProfile } from "./profile/test/profile-examples";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TwoFactorAuthReminders />
      <ProfilePage {...exampleProfile} />
      <Footer />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
