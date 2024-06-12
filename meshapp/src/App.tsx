import "./App.css";

import { AccountProvider } from "./contexts/UserContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContextProvider } from "./themes/ThemeContextProvider";
import { MainThemeProvider } from "./themes/MainThemeProvider";
import AppRoutes from "./routes/AppRoutes";

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
