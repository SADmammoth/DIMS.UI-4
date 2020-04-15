import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../helpers/Client';
import MemberProgressCard from '../components/cards/TaskCards/MemberProgressCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import Spinner from '../components/elements/Spinner/Spinner';

class MemberProgressPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: null, id: this.props.match.params.id };
  }

  async componentDidMount() {
    const taskData = await Client.getUserProgress(this.state.id);
    this.setState({ tasks: taskData });
  }

  static renderProgressCard(id, data) {
    const { taskName, trackNote, trackDate } = data;
    return <MemberProgressCard id={id} taskName={taskName} trackNote={trackNote} trackDate={trackDate} />;
  }

  renderProgress() {
    const { tasks } = this.state;
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return MemberProgressPage.renderProgressCard(id, data);
    });
  }

  render() {
    const { tasks } = this.state;
    const anytask = (tasks && Object.values(tasks)[0]) || {};

    return (
      <>
        <Helmet>{`${anytask.userName || 'Name'}'s progress`}</Helmet>
        <Header>
          <h1>{`${anytask.userName || 'Name'}'s progress`}</h1>
        </Header>
        <ContainerComponent>
          {tasks ? (
            <div>{Object.keys(tasks).length ? <CollapsableItemsList items={this.renderProgress()} /> : 'No tasks'}</div>
          ) : (
            <Spinner centered />
          )}
        </ContainerComponent>
      </>
    );
  }
}

export default withRouter(MemberProgressPage);
