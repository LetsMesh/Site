import logo from "./logo.svg";
import "./App.css";
import React from "react";

import TwoFactorAuthModal from "./2FA/2FA-Popup";
import TwoFactorBanner from "./2FA/2FA-Banner";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TwoFactorBanner />
        <TwoFactorAuthModal />
      </header>
    </div>
  );
}

export default App;
