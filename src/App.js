import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';

const App = (props) => {
  return (
    <Router>
      <AuthorizationManager>
        <Routes />
      </AuthorizationManager>
    </Router>
  );
};

export default App;
