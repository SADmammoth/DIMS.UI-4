import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';
import UserContext from './helpers/UserContext';

const App = (props) => {
  return (
    <Router>
      <AuthorizationManager>
        <UserContext.Consumer>
          {({ role, userId }) => {
            return <Routes role={role} userId={userId} />;
          }}
        </UserContext.Consumer>
      </AuthorizationManager>
    </Router>
  );
};

export default App;
