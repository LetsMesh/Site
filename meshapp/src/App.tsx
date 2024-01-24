import "./App.css";
import React from "react";
import AppRoutes from "./Routing/AppRoutes";
import TwoFactorAuthReminders from "./two-factor-auth/two-factor-reminder";
import ProfilePage from "./profile/profile-page";
import { exampleProfile } from "./profile/tests/profile-examples";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import { MainThemeProvider } from "./theme/MainThemeProvider";
import { AccountProvider } from "./contexts/UserContext";

function App() {
  return (
    <React.StrictMode>
      <ThemeContextProvider>
        <MainThemeProvider>
          <AccountProvider>
            {/* <TwoFactorAuthReminders /> */}
            {/* <ProfilePage {...exampleProfile} /> */}
            <AppRoutes />
          </AccountProvider>
        </MainThemeProvider>
      </ThemeContextProvider>
    </React.StrictMode>
  );
}

export default App;
