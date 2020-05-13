import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthorizationManager from './helpers/components/AuthorizationManager';
import Routes from './Routes';
import store from './redux';
import Preloader from './helpers/components/Preloader';
import UserContextConsumer from './helpers/components/UserContextConsumer';
import ScrollToTop from './helpers/components/ScrollToTop';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AuthorizationManager>
          <UserContextConsumer>
            {({ role, userId }) => {
              return (
                <Preloader role={role}>
                  <Routes role={role} userId={userId} />
                </Preloader>
              );
            }}
          </UserContextConsumer>
        </AuthorizationManager>
      </Router>
    </Provider>
  );
};

export default App;
