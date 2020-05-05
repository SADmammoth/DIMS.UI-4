import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContainerComponent from '../components/elements/ContainerComponent';
import UserContextConsumer from '../helpers/components/UserContextConsumer';
import Header from '../components/elements/Header';
import getNavItems from '../helpers/getNavItems';
import Client from '../helpers/Client';
import Validator from '../helpers/Validator';
import TaskEdit from '../components/elements/TaskForms/TaskEdit';
import checkboxValueSeparator from '../helpers/checkboxValueSeparator';
import masks from '../helpers/maskHelpers/masks';
import getStateMembers from '../helpers/getStateMembers';

class NewTask extends React.Component {
  postTask = async ({ taskName, taskDescription, taskStart, taskDeadline, members }) => {
    const calculatedTaskStart = Validator.parseDateByMask(taskStart, masks.date);
    const calculatedTaskDeadline = Validator.parseDateByMask(taskDeadline, masks.date);
    const createTask = () => {
      return Client.postTask(taskName, taskDescription, calculatedTaskStart, calculatedTaskDeadline);
    };

    if (members.length) {
      await createTask();
      return Client.assignTask(checkboxValueSeparator(members));
    }
    return Client.assignTask(checkboxValueSeparator(members));
  };

  render() {
    const { members, match } = this.props;

    return (
      <>
        <Helmet>
          <title>New task</title>
        </Helmet>
        <UserContextConsumer>
          {({ role, userId }) => {
            return (
              <Header
                role={role}
                title='New Task'
                navItems={getNavItems(
                  {
                    role,
                    userId,
                  },
                  match.path,
                )}
              />
            );
          }}
        </UserContextConsumer>
        <ContainerComponent>
          <TaskEdit empty members={members} onSubmit={this.postTask} />
        </ContainerComponent>
      </>
    );
  }
}

NewTask.propTypes = {
  members: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default withRouter(connect(getStateMembers)(NewTask));
