import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';
import UserContextConsumer from './helpers/UserContextConsumer';
import ThemePreloader from './ThemePreloader';

const App = (props) => {
  return (
    <Router>
      <ThemePreloader>
        <AuthorizationManager>
          <UserContextConsumer>
            {({ role, userID }) => {
              return <Routes role={role} userID={userID} />;
            }}
          </UserContextConsumer>
        </AuthorizationManager>
      </ThemePreloader>
    </Router>
  );
};

export default App;
