import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthorizationManager from './helpers/components/AuthorizationManager';
import Routes from './Routes';
import store from './redux';
import Preloader from './helpers/components/Preloader';
import UserContextConsumer from './helpers/components/UserContextConsumer';

const App = () => {
  return (
    <Provider store={store}>
      <Preloader>
        <Router>
          <AuthorizationManager>
            <UserContextConsumer>
              {({ role, userId }) => {
                return <Routes role={role} userId={userId} />;
              }}
            </UserContextConsumer>
          </AuthorizationManager>
        </Router>
      </Preloader>
    </Provider>
  );
};

export default App;
