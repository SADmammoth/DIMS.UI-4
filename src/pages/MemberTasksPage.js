import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/MemberTaskCard/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import Container from '../components/elements/Container';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, id: this.props.match.params.id, name: 'Name' };
  }

  async componentDidMount() {
    let taskData;
    if (this.props.taskSet === 'user') {
      this.getName();
      taskData = await Client.getUserTasks(this.state.id);
    } else if (this.props.taskSet === 'all') {
      taskData = await Client.getTasks(this.state.id);
    }
    this.setState({ tasks: taskData });
  }

  async getName() {
    this.setState({ name: (await Client.getMember(this.state.id)).firstName });
  }

  static renderTask(id, data, taskSet) {
    const { taskName, taskDescription, state, taskStart, taskDeadline, assignedTo } = data;
    let feature;
    switch (taskSet) {
      case 'all':
        feature = 'assign';
        break;
      case 'user':
        feature = 'track';
        break;
    }
    return (
      <MemberTaskCard
        id={id}
        taskName={taskName}
        taskDescription={taskDescription}
        state={state}
        taskStart={taskStart}
        taskDeadline={taskDeadline}
        feature={feature}
        assignedTo={assignedTo}
      />
    );
  }

  renderTasks() {
    const { tasks } = this.state;
    return Object.entries(tasks).map((task) => {
      const id = task[0];
      const data = task[1];
      return MemberTasksPage.renderTask(id, data, this.props.taskSet);
    });
  }

  render() {
    const { tasks, name } = this.state;
    const { taskSet } = this.props;
    console.log(tasks);
    return (
      <Container>
        {taskSet !== 'all' && <h1>{`${name}'s tasks`}</h1>}
        <div>
          {Object.keys(tasks).length ? (
            <CollapsableItemsList open={this.props.match.params.open} items={this.renderTasks()} />
          ) : (
            'No tasks'
          )}
        </div>
      </Container>
    );
  }
}

export default withRouter(MemberTasksPage);
