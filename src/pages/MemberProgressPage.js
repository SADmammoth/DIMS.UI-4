import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberProgressCard from '../components/cards/MemberProgressCard/index.js';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';

class MembersProgressPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = { tasks: {} };
  }

  async componentDidMount() {
    const taskData = await Client.getUserProgress(this.id);
    this.setState({ tasks: taskData });
  }
  renderProgressCard(id, data) {
    return <MemberProgressCard id={id} {...data} />;
  }

  renderProgress() {
    return Object.entries(this.state.tasks).map((el) => this.renderProgressCard(el[0], el[1]));
  }

  render() {
    let anytask = Object.values(this.state.tasks)[0];
    return (
      <>
        <h1>{`${anytask && anytask.userName}'s progress`}</h1>
        <div>
          {Object.keys(this.state.tasks).length ? (
            <CollapsableItemsList>{this.renderProgress()}</CollapsableItemsList>
          ) : (
            'No tasks'
          )}
        </div>
      </>
    );
  }
}

export default withRouter(MembersProgressPage);
