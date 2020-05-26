import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from '../pages/HomePage';
import LoginForm from '../components/elements/LoginForm';
import Error404Page from '../pages/ErrorPages/Error404Page';

function GuestRoutes({ logIn }) {
  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/login'>
        <LoginForm logIn={logIn} show />
      </Route>
      <Route exact path='/404'>
        <Error404Page />
      </Route>

      <Route>
        <Redirect to='/404' />
      </Route>
    </Switch>
  );
}
GuestRoutes.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default GuestRoutes;
