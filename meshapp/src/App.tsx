import "./App.css";
import AppRoutes from "./routing/AppRoutes";
import { ThemeContextProvider } from "./themes/ThemeContextProvider";
import { MainThemeProvider } from "./themes/MainThemeProvider";
import { AccountProvider } from "./contexts/UserContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.StrictMode>
      <AccountProvider>
        <ThemeContextProvider>
          <MainThemeProvider>
            <AppRoutes />
            <ToastContainer />
          </MainThemeProvider>
        </ThemeContextProvider>
      </AccountProvider>
    </React.StrictMode>
  );
}

export default App;
