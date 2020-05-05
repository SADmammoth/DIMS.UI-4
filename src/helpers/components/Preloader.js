import React from 'react';
import PropTypes from 'prop-types';

import Client from '../Client';
import store from '../../redux';
import * as membersActions from '../../redux/actions/membersActions';
import preloadTheme from '../preloadTheme';

class Preloader extends React.Component {
  async componentDidMount() {
    preloadTheme();
    const members = await Client.getMembers();
    store.dispatch(membersActions.setMembers(members));
  }

  render() {
    return <>{this.props.children}</>;
  }
}

Preloader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Preloader;
