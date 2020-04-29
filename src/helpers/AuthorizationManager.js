import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthenticationManager from './AuthenticationManager';
import LoginForm from '../components/elements/LoginForm';
import { UserContext } from './UserContextConsumer';

class AuthorizationManager extends Component {
  constructor(props) {
    super(props);
    this.state = { authorizedUser: { role: 'guest', userID: 'guest' }, roles: ['guest', 'member', 'admin', 'mentor'] };
  }

  authorize = (role, userID) => {
    const { roles } = this.state;
    if (!role || !userID) {
      this.setState({ authorizedUser: JSON.parse(localStorage.getItem('userInfo')) });
    }
    if (roles.includes(role)) {
      localStorage.setItem('userInfo', JSON.stringify({ role, userID }));
      this.setState({ authorizedUser: { role, userID } });
    }
  };

  deleteUserInfo = () => {
    localStorage.removeItem('userInfo');
    this.setState({ authorizedUser: { role: 'guest', userID: 'guest' } });
  };

  render() {
    const { children } = this.props;
    const { authorizedUser } = this.state;
    return (
      <>
        <UserContext.Provider value={authorizedUser}>
          <AuthenticationManager
            logInFormClass={LoginForm}
            authorize={this.authorize}
            deleteUserInfo={this.deleteUserInfo}
          >
            {children}
          </AuthenticationManager>
        </UserContext.Provider>
      </>
    );
  }
}

AuthorizationManager.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthorizationManager;
