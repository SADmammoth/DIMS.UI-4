import Client from './Client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import LogOut from './LogOut';

class AuthenticationManager extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
  }

  async componentDidMount() {
    await this.logIn();
  }

  logIn = async (login, password) => {
    const authResponse = await this.authenticate(login, password);
    this.setState({ authenticated: authResponse.status === 'success' });
  };

  logOut = () => {
    this.setState({ authenticated: null });
    localStorage.removeItem('authToken');
    this.props.deleteUserInfo();
  };

  authenticate = async (login, password) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken || !(await Client.checkToken(authToken))) {
      if (!login || !password) {
        return { status: 'fail' };
      }
      const { status, found, token, role, userID } = await Client.signIn(login, password);
      if (status === 'fail' && found) {
        return { status, message: 'Incorrect password' };
      }
      if (status === 'fail' && !found) {
        return { status, message: 'Incorrect userName' };
      }

      localStorage.setItem('authToken', token);
      this.props.authorize(role, userID);
    } else {
      const { role, userID } = await Client.getUserInfoByToken(authToken);
      this.props.authorize(role, userID);
    }
    return { status: 'success', message: 'Login successful' };
  };

  render() {
    const { logInFormClass: LogInForm, children } = this.props;
    return (
      <>
        {this.state.authenticated !== null && (this.state.authenticated ? children : <Redirect to='/login' />)}
        <Route exact path='/login'>
          {!this.state.authenticated ? <LogInForm logIn={this.logIn} show /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/logout'>
          <LogOut logOut={this.logOut} />
        </Route>
      </>
    );
  }
}

AuthenticationManager.propTypes = {
  authorize: PropTypes.func.isRequired,
  logInFormClass: PropTypes.func.isRequired,
  deleteUserInfo: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthenticationManager;
