import React from 'react';
import { withRouter } from 'react-router-dom';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/MemberTaskCard/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, id: this.props.match.params.id, name: 'Name' };
  }

  async componentDidMount() {
    this.getName();
    const taskData = await Client.getUserTasks(this.state.id);
    this.setState({ tasks: taskData });
  }

  async getName() {
    this.setState({ name: (await Client.getMember(this.state.id)).firstName });
  }

  static renderTask(id, data) {
    const { taskName, taskDescription, state, taskStart, taskDeadline } = data;
    return (
      <MemberTaskCard
        id={id}
        taskName={taskName}
        taskDescription={taskDescription}
        state={state}
        taskStart={taskStart}
        taskDeadline={taskDeadline}
      />
    );
  }

  renderTasks() {
    const { tasks } = this.state;
    return Object.entries(tasks).map((task) => {
      const id = task[0];
      const data = task[1];
      return MemberTasksPage.renderTask(id, data);
    });
  }

  render() {
    const { tasks, name } = this.state;
    return (
      <>
        <h1>{`${name}'s tasks`}</h1>
        <div>
          {Object.keys(tasks).length ? <CollapsableItemsList>{this.renderTasks()}</CollapsableItemsList> : 'No tasks'}
        </div>
      </>
    );
  }
}

export default withRouter(MemberTasksPage);
