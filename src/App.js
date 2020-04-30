import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthorizationManager from './helpers/AuthorizationManager';
import Routes from './Routes';
import UserContext from './helpers/UserContext';
import store from './redux';
import { Provider } from 'react-redux';
import Preloader from './Preloader';

const App = (props) => {
  return (
    <Provider store={store}>
      <Router>
        <Preloader>
          <AuthorizationManager>
            <UserContext.Consumer>
              {({ role, userId }) => {
                return <Routes role={role} userId={userId} />;
              }}
            </UserContext.Consumer>
          </AuthorizationManager>
        </Preloader>
      </Router>
    </Provider>
  );
};

export default App;

// TODO merge pages
// TODO fix errors
// TODO improve adaptivity
