import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function LogOut({ logOut }) {
  logOut();
  return <Redirect to='/' />;
}

LogOut.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default LogOut;
