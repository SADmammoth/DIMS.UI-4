import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Client from '../Client';
import store from '../../redux';
import * as membersActions from '../../redux/actions/membersActions';
import preloadTheme from '../preloadTheme';

const Preloader = ({ children }) => {
  preloadTheme();
  useEffect(() => {
    async function fetchMembers() {
      const members = await Client.getMembers();
      store.dispatch(membersActions.setMembers(members));
    }

    fetchMembers();
  }, []);

  return <>{children}</>;
};

Preloader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Preloader;
