import React from 'react';
import { Redirect } from 'react-router-dom';

export default function LogOut({ logOut }) {
  logOut();
  return <Redirect to='/login' />;
}
