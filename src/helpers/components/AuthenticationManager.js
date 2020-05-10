import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Client from '../Client';
import LogOut from './LogOut';
import GuestRoutes from '../../Routes/GuestRoutes';

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
    const { deleteUserInfo } = this.props;
    this.setState({ authenticated: null });
    localStorage.removeItem('authToken');
    deleteUserInfo();
  };

  redirectHome = () => {
    this.props.history.push('/');
  };

  authenticate = async (login, password) => {
    const { authorize } = this.props;
    const authToken = localStorage.getItem('authToken');
    if (!authToken || !(await Client.checkToken(authToken))) {
      if (!login || !password) {
        return { status: 'fail' };
      }
      const { status, found, token, role, userId } = await Client.signIn(login, password);
      if (status === 'fail' && found) {
        return { status, message: 'Incorrect password' };
      }
      if (status === 'fail' && !found) {
        return { status, message: 'Incorrect userName' };
      }

      localStorage.setItem('authToken', token);
      authorize(role, userId);

      this.redirectHome();
    } else {
      const { role, userId } = await Client.getUserInfoByToken(authToken);
      authorize(role, userId);
    }

    return { status: 'success', message: 'Login successful' };
  };

  render() {
    const { children } = this.props;
    const { authenticated } = this.state;

    return (
      <>
        {authenticated ? children : <GuestRoutes logIn={this.logIn} />}
        <Route exact path='/logout'>
          {authenticated ? <LogOut logOut={this.logOut} /> : <Redirect to='/404' />}
        </Route>
      </>
    );
  }
}

AuthenticationManager.propTypes = {
  authorize: PropTypes.func.isRequired,
  deleteUserInfo: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(AuthenticationManager);
