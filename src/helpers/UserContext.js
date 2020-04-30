import React from 'react';

const UserContext = React.createContext({ role: 'guest', userId: 'guest' });
export default UserContext;
