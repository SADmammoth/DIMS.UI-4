import Client from './Client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthorizationManager extends Component {
  constructor(props) {
    super(props);
    this.state = { authorized: null };
  }

  async componentDidMount() {
    await this.logIn();
  }

  logIn = async (login, password) => {
    this.setState({ authorized: (await this.authorize(login, password)).status === 'success' });
  };

  authorize = async (login, password) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken || !(await Client.checkToken(authToken))) {
      if (!login || !password) {
        return { status: 'fail' };
      }
      const { status, found, token } = await Client.signIn(login, password);
      if (status === 'fail' && found) {
        return { status, message: 'Incorrect password' };
      }
      if (status === 'fail' && !found) {
        return { status, message: 'Incorrect username' };
      }

      localStorage.setItem('authToken', token);
    }
    return { status: 'success', message: 'Login succesful' };
  };

  render() {
    const { logInModalClass: LogInModal, children } = this.props;
    return (
      <>
        {this.state.authorized !== null && (this.state.authorized ? children : <LogInModal logIn={this.logIn} show />)}
      </>
    );
  }
}

AuthorizationManager.propTypes = {
  logInModalClass: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthorizationManager;
