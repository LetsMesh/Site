import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TwoFactorAuthReminders from "./components/two-factor-auth/two-factor-reminder";
import AppRoutes from "./Routing/AppRoutes";
import ProfilePage from "./pages/profile/profile-page";
import { exampleProfile } from "./pages/profile/tests/profile-examples";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import { MainThemeProvider } from "./theme/MainThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <MainThemeProvider>
        <TwoFactorAuthReminders />
        <ProfilePage {...exampleProfile} />
        <AppRoutes />
      </MainThemeProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
