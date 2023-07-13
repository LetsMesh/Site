import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./home/login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TwoFactorAuthReminders from "./two-factor-auth/two-factor-reminder";
import LoggedOutPage from "./home/logged-out/home";
import Slider from "./ProfileCardCarousel/Swiper";
import MainTheme from "./theme/MainTheme";
import { ThemeProvider } from "@emotion/react";
import ProfilePage from "./profile/profile-page";
import {
  exampleProfile,
  exampleProfile2,
} from "./profile/tests/profile-examples";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={MainTheme}>
      <TwoFactorAuthReminders />
      <Header />
      <LoggedOutPage />
      <Slider />
      <Login />
      <Footer />
      <ProfilePage {...exampleProfile} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
