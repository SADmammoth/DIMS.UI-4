import React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({ role: 'guest', userId: 'guest' });

function UserContextConsumer({ children }) {
  return <UserContext.Consumer>{children}</UserContext.Consumer>;
}

UserContextConsumer.propTypes = {
  children: PropTypes.func.isRequired,
};

export default UserContextConsumer;

export { UserContext };
