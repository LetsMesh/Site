import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TwoFactorAuthReminders from "./two-factor-auth/two-factor-reminder";
import LoggedOutPage from "./home/logged-out/home";
import Slider from "./ProfileCardCarousel/Swiper";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <TwoFactorAuthReminders />
    <Slider />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
