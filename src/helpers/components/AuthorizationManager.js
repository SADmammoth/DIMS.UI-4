import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthenticationManager from './AuthenticationManager';
import { UserContext } from './UserContextConsumer';

class AuthorizationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorizedUser: { role: 'guest', userId: 'guest' },
      roles: ['guest', 'member', 'admin', 'mentor'],
    };
  }

  authorize = (role, userId) => {
    const { roles } = this.state;

    if (roles.includes(role)) {
      this.setState({ authorizedUser: { role, userId } });
    }
  };

  deleteUserInfo = () => {
    this.setState({ authorizedUser: { role: 'guest', userId: 'guest' } });
  };

  render() {
    const { children } = this.props;
    const { authorizedUser } = this.state;
    return (
      <>
        <UserContext.Provider value={authorizedUser}>
          <AuthenticationManager authorize={this.authorize} deleteUserInfo={this.deleteUserInfo}>
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
