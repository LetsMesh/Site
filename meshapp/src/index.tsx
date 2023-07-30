import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TwoFactorAuthReminders from "./two-factor-auth/two-factor-reminder";
import MainTheme from "./theme/MainTheme";
import { ThemeProvider } from "@emotion/react";
import AppRoutes from "./Routes/AppRoutes";
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={MainTheme}>
      <TwoFactorAuthReminders />
      <AppRoutes />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
