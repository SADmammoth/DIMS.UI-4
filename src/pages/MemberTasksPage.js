import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/TaskCards/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: {}, taskSet: null, name: 'Name', members: [] };
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
    let members;

    if (this.props.taskSet === 'user') {
      name = (await MemberTasksPage.getName(userId)).firstName;
      taskData = await Client.getUserTasks(userId);
    } else if (this.props.taskSet === 'all') {
      taskData = await Client.getTasks();
      members = Object.values(await Client.getMembers()).map((member) => {
        return { firstName: member.firstName, lastName: member.lastName };
      });
    }

    this.setState({ tasks: taskData, name, taskSet: this.props.taskSet, members });
  }

  static renderTask(id, data, taskSet, members, edit) {
    const { id: taskID, taskName, taskDescription, state, taskStart, taskDeadline, assignedTo } = data;
    let feature;

    switch (taskSet) {
      case 'all':
        feature = 'assign';
        break;
      case 'user':
        feature = 'track';
        break;
      default:
        throw Error('Bad task set');
    }

    return (
      <MemberTaskCard
        id={id}
        edit={edit}
        taskID={taskID}
        taskName={taskName}
        taskDescription={taskDescription}
        state={state}
        taskStart={taskStart}
        taskDeadline={taskDeadline}
        feature={feature}
        assignedTo={assignedTo}
        members={members}
      />
    );
  }

  renderTasks() {
    const { tasks, members } = this.state;
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return MemberTasksPage.renderTask(id, data, this.props.taskSet, members, this.props.edit);
    });
  }

  render() {
    const { tasks, name } = this.state;
    const { taskSet } = this.props;
    const title = `${name}'s tasks`;
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header>{taskSet !== 'all' && <h1>{title}</h1>}</Header>
        <ContainerComponent>
          <div>
            {Object.keys(tasks).length ? (
              <CollapsableItemsList open={this.props.match.params.open} items={this.renderTasks()} />
            ) : (
              'No tasks'
            )}
          </div>
        </ContainerComponent>
      </>
    );
  }
}

MemberTasksPage.defaultProps = {
  edit: false,
};

MemberTasksPage.propTypes = {
  taskSet: PropTypes.string.isRequired,
  edit: PropTypes.bool,
};

export default withRouter(MemberTasksPage);
