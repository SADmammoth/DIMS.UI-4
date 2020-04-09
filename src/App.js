import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';
import LoginModal from './components/elements/LoginModal/LoginModal';

const App = (props) => {
  return (
    <Router>
      <AuthorizationManager logInModalClass={LoginModal}>
        <Routes />
      </AuthorizationManager>
    </Router>
  );
};

export default App;
