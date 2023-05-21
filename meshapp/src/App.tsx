import logo from './logo.svg';
import React from 'react';
import Route from './components/Route'
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Route path="/">
        <div>
          landing page
        </div>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
      
    </div>
  );
}

export default App;
