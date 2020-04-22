import React from 'react';
import Client from './helpers/Client';
import store from './redux';
import * as membersActions from './redux/actions/membersActions';

class Preloader extends React.Component {
  async componentDidMount() {
    const members = await Client.getMembers();
    console.log(members);
    store.dispatch(membersActions.setMembers(members));
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default Preloader;
