import Client from './Client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthenticationManager extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
  }

  async componentDidMount() {
    await this.logIn();
  }

  logIn = async (login, password) => {
    this.setState({ authenticated: (await this.authenticate(login, password)).status === 'success' });
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
        return { status, message: 'Incorrect username' };
      }

      localStorage.setItem('authToken', token);
      this.props.authorize(role, userID);
    }

    this.props.authorize();
    return { status: 'success', message: 'Login succesful' };
  };

  render() {
    const { logInModalClass: LogInModal, children } = this.props;
    return (
      <>
        {this.state.authenticated !== null &&
          (this.state.authenticated ? children : <LogInModal logIn={this.logIn} show />)}
      </>
    );
  }
}

AuthenticationManager.propTypes = {
  authorize: PropTypes.func.isRequired,
  logInModalClass: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default AuthenticationManager;
