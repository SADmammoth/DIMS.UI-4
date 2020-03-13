import React from 'react';
import { withRouter } from 'react-router-dom';

class Error404Page extends React.Component {
  render() {
    return <p>404: not found</p>;
  }
}

export default withRouter(Error404Page);
