import React from 'react';
import { withRouter } from 'react-router-dom';

class MemberProgressPage extends React.Component {
  render() {
    return <p>{`Member ${this.props.match.params.id} progress `}</p>;
  }
}

export default withRouter(MemberProgressPage);
