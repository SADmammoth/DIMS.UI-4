import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Client from '../helpers/Client';
import MemberProgressCard from '../components/cards/MemberProgressCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import Container from '../components/elements/Container';
import Header from '../components/elements/Header';

class MemberProgressPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, id: this.props.match.params.id };
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
    return Object.entries(tasks).map((task) => {
      const id = task[0];
      const data = task[1];
      return MemberProgressPage.renderProgressCard(id, data);
    });
  }

  render() {
    const { tasks } = this.state;
    const anytask = Object.values(tasks)[0] || {};

    return (
      <>
        <Helmet>{`${anytask.userName || 'Name'}'s progress`}</Helmet>
        <Header>
          <h1>{`${anytask.userName || 'Name'}'s progress`}</h1>
        </Header>
        <Container>
          <div>{Object.keys(tasks).length ? <CollapsableItemsList items={this.renderProgress()} /> : 'No tasks'}</div>
        </Container>
      </>
    );
  }
}

export default withRouter(MemberProgressPage);
