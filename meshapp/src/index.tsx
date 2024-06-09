import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeContextProvider } from "src/themes/ThemeContextProvider";
import { MainThemeProvider } from "./themes/MainThemeProvider";
import TwoFactorAuthReminders from "./components/TwoFactorAuth/TwoFactorReminder";
import ProfilePage from "./pages/Profiles/ProfilePage";
import AppRoutes from "./routes/AppRoutes";
import { exampleProfile } from "./pages/Profiles/tests/profile-examples";

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
