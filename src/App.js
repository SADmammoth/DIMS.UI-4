import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';
import store from './redux';
import Preloader from './Preloader';
import UserContextConsumer from './helpers/UserContextConsumer';
import ThemePreloader from './ThemePreloader';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemePreloader>
          <Preloader>
            <AuthorizationManager>
              <UserContextConsumer>
                {({ role, userId }) => {
                  return <Routes role={role} userId={userId} />;
                }}
              </UserContextConsumer>
            </AuthorizationManager>
          </Preloader>
        </ThemePreloader>
      </Router>
    </Provider>
  );
};

export default App;

// TODO fix errors
