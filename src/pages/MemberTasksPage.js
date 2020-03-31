import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/MemberTaskCard/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import Container from '../components/elements/Container';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, taskSet: null, name: 'Name' };
  }

  async componentDidMount() {
    this.update();
  }

  async componentDidUpdate() {
    if (this.state.taskSet !== this.props.taskSet) {
      this.update();
    }
  }

  static async getName(userId) {
    return Client.getMember(userId);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.taskSet !== props.taskSet) {
      return { ...state, tasks: {}, name: 'Name' };
    }
  }

  async update() {
    let taskData;
    let { name } = this.state;
    const userId = this.props.match.params.id;
    if (this.props.taskSet === 'user') {
      name = (await MemberTasksPage.getName(userId)).firstName;
      taskData = await Client.getUserTasks(userId);
    } else if (this.props.taskSet === 'all') {
      taskData = await Client.getTasks();
    }
    this.setState({ tasks: taskData, name, taskSet: this.props.taskSet });
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
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return MemberTasksPage.renderTask(id, data, this.props.taskSet);
    });
  }

  render() {
    const { tasks, name } = this.state;
    const { taskSet } = this.props;
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
