import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginForm from '../components/elements/LoginForm';

export default function GuestRoutes({ logIn }) {
  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route path='/login'>
        <LoginForm logIn={logIn} show />
      </Route>
    </Switch>
  );
}
