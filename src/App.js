import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';
import UserContextConsumer from './helpers/UserContextConsumer';
import ThemePreloader from './ThemePreloader';

const App = (props) => {
  return (
    <Router>
      <AuthorizationManager>
        <ThemePreloader>
          <UserContextConsumer>
            {({ role, userID }) => {
              return <Routes role={role} userID={userID} />;
            }}
          </UserContextConsumer>
        </ThemePreloader>
      </AuthorizationManager>
    </Router>
  );
};

export default App;
