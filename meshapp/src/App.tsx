import "./App.css";
import AppRoutes from "./Routing/AppRoutes";
import ProfilePage from "./profile/profile-page";
import { exampleProfile } from "./profile/tests/profile-examples";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import { MainThemeProvider } from "./theme/MainThemeProvider";
import { AccountProvider } from "./contexts/UserContext";
import React from "react";

function App() {
  return (
    <React.StrictMode>
      <AccountProvider>
        <ThemeContextProvider>
          <MainThemeProvider>
            <AppRoutes />
          </MainThemeProvider>
        </ThemeContextProvider>
      </AccountProvider>
    </React.StrictMode>
  );
}

export default App;
