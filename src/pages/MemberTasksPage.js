import React from 'react';
import { withRouter } from 'react-router-dom';

class MembersTasksPage extends React.Component {
  render() {
    return <p>{`Member ${this.props.match.params.id} tasks`}</p>;
  }
}

export default withRouter(MembersTasksPage);
