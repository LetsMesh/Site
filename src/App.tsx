import logo from './logo.svg';
import './App.css';
import React from 'react';

import Popup from './2FA/2FA-Popup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Popup open={true} onClose={() => {}} />
      </header>
    </div>
  );
}

export default App;
