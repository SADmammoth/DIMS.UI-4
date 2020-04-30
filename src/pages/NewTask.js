import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContainerComponent from '../components/elements/ContainerComponent';
import UserContextConsumer from '../helpers/UserContextConsumer';
import Header from '../components/elements/Header';
import getNavItems from '../helpers/getNavItems';
import Client from '../helpers/Client';
import Validator from '../helpers/Validator';
import Spinner from '../components/elements/Spinner';
import TaskEdit from '../components/elements/TaskForms/TaskEdit';
import compareObjects from '../helpers/compareObjects';
import checkboxValueSeparator from '../helpers/checkboxValueSeparator';

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  shouldComponentUpdate(nextProps) {
    return !compareObjects(nextProps.members, this.props.members);
  }

  postTask = async ({ taskName, taskDescription, taskStart, taskDeadline, members }) => {
    this.setState({ loading: true });
    const calculatedTaskStart = Validator.dateByMask(taskStart, 'dd-MM-yyyy');
    const calculatedTaskDeadline = Validator.dateByMask(taskDeadline, 'dd-MM-yyyy');
    const createTask = () => {
      return Client.postTask(taskName, taskDescription, calculatedTaskStart, calculatedTaskDeadline);
    };

    if (members.length) {
      await createTask();
      return Client.assignTask(checkboxValueSeparator(members))
        .then((response) => {
          this.setState({ loading: false });
          return response;
        })
        .catch((response) => {
          this.setState({ loading: false });
          return response;
        });
    }
    return createTask()
      .then((response) => {
        this.setState({ loading: false });
        return response;
      })
      .catch((response) => {
        this.setState({ loading: false });
        return response;
      });
  };

  render() {
    const { members } = this.props;

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
                  this.props.match.path,
                )}
              />
            );
          }}
        </UserContextConsumer>
        <ContainerComponent>
          {!this.state.loading && Object.keys(members).length ? (
            <TaskEdit empty members={members} onSubmit={this.postTask} />
          ) : (
            <Spinner centered />
          )}
        </ContainerComponent>
      </>
    );
  }
}

NewTask.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(
  connect((state) => {
    return { members: state.members };
  })(NewTask),
);
