import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TwoFactorAuthReminders from "./two-factor-auth/two-factor-reminder";
import AppRoutes from "./Routing/AppRoutes";
import ProfilePage from "./profile/profile-page";
import { exampleProfile } from "./profile/tests/profile-examples";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import { MainThemeProvider } from "./theme/MainThemeProvider";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <MainThemeProvider>
        <TwoFactorAuthReminders />
        <AppRoutes />
      </MainThemeProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
