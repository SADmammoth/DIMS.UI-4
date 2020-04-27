import React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({ role: 'guest', userID: 'guest' });

function UserContextConsumer({ children }) {
  return <UserContext.Consumer>{children}</UserContext.Consumer>;
}

UserContextConsumer.defaultProps = {
  children: null,
};

UserContextConsumer.propTypes = {
  children: PropTypes.any,
};

export default UserContextConsumer;

export { UserContext };
