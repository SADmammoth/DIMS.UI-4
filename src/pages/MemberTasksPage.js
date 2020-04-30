import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Client from '../helpers/Client';
import MemberTaskCard from '../components/cards/TaskCards/MemberTaskCard';
import CollapsableItemsList from '../components/lists/CollapsableItemsList';
import ContainerComponent from '../components/elements/ContainerComponent';
import Header from '../components/elements/Header';
import Spinner from '../components/elements/Spinner/Spinner';
import UserContextConsumer from '../helpers/UserContextConsumer';
import getNavItems from '../helpers/getNavItems';
import Footer from '../components/elements/Footer';

class MemberTasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: null, taskSet: null };
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    if (this.state.taskSet !== this.props.taskSet) {
      this.update();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.taskSet !== props.taskSet) {
      return { ...state, tasks: null, name: 'Name' };
    }
    return state;
  }

  async update() {
    let taskData;
    const userId = this.props.match.params.id;

    const { taskSet } = this.props;

    if (taskSet === 'user') {
      taskData = await Client.getUserTasks(userId);
    } else if (taskSet === 'all') {
      taskData = await Client.getTasks();
    }

    this.setState({
      tasks: taskData,
      taskSet: this.props.taskSet,
    });
  }

  wrappedMemberTask = ({ collapsed, id, taskSet, edit, open, close, ...data }) => {
    const { taskId, taskName, taskDescription, state, taskStart, taskDeadline, assignedTo } = data;
    return (
      <UserContextConsumer>
        {({ role }) => {
          return (
            <MemberTaskCard
              id={id}
              edit={edit}
              taskId={taskId}
              taskName={taskName}
              taskDescription={taskDescription}
              state={state}
              taskStart={taskStart}
              taskDeadline={taskDeadline}
              taskSet={taskSet}
              role={role}
              open={open}
              close={close}
              collapsed={collapsed}
              assignedTo={assignedTo}
              reload={() => this.update()}
            />
          );
        }}
      </UserContextConsumer>
    );
  };

  renderTask(id, data, taskSet, edit) {
    const WrappedMemberTask = this.wrappedMemberTask;
    return <WrappedMemberTask id={id} taskSet={taskSet} edit={edit} {...data} />;
  }

  renderTasks() {
    const { tasks } = this.state;
    return Object.entries(tasks).map(({ 0: id, 1: data }) => {
      return this.renderTask(id, data, this.props.taskSet, this.props.edit);
    });
  }

  render() {
    const { tasks } = this.state;
    const { taskSet, name } = this.props;
    return (
      <>
        <UserContextConsumer>
          {({ role, userId }) => {
            const title = role === 'member' || taskSet === 'all' ? 'Tasks' : `${name}'s tasks`;
            return (
              <>
                <Helmet>
                  <title>{title}</title>
                </Helmet>
                <Header role={role} title={title} navItems={getNavItems({ role, userId }, this.props.match.path)} />
              </>
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {tasks ? (
              <div>
                {Object.keys(tasks).length ? (
                  <CollapsableItemsList open={this.props.match.params.open} items={this.renderTasks()} />
                ) : (
                  'No tasks'
                )}
              </div>
            ) : (
              <Spinner centered />
            )}
          </ContainerComponent>
        </main>
        <Footer />
      </>
    );
  }
}

MemberTasksPage.defaultProps = {
  edit: false,
  name: 'Name',
  taskSet: 'all',
};

MemberTasksPage.propTypes = {
  taskSet: PropTypes.string,
  edit: PropTypes.bool,
  name: PropTypes.string,
};

export default withRouter(
  connect((state, ownProps) => {
    const member = state.members[ownProps.match.params.id];
    return { name: member ? member.firstName : 'Name' };
  })(MemberTasksPage),
);
