import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import taskEditInputsAttributes from './taskEditInputsAttributes';
import Spinner from '../../Spinner';
import checkTaskDates from '../../../../helpers/checkTaskDates';
import errorNotification from '../../../../helpers/errorNotification';

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: {}, loading: false };
  }

  render() {
    const { onSubmit, empty, handleClose } = this.props;
    const { inputs, loading } = this.state;
    const onSubmitHandler = (data) => {
      this.setState({ loading: true });
      if (!checkTaskDates(data.taskStart, data.taskDeadline)) {
        errorNotification('Task dates input', 'Deadline date is set before start date');
        return new Promise((resolve) => resolve());
      }
      return onSubmit(data)
        .then((res) => {
          this.setState({ loading: false });
          return res;
        })
        .catch((res) => {
          this.setState({ loading: false });
          return res;
        });
    };

    return (
      <>
        {loading ? (
          <Spinner centered />
        ) : (
          <Form
            className={`task-edit${empty ? ' empty' : ''}`}
            inputs={taskEditInputsAttributes(this.props)}
            onInputsUpdate={(inputsComponents) => this.setState({ inputs: inputsComponents })}
            onSubmit={onSubmitHandler}
            submitButton={<Button content='Confirm' classMod='secondary' />}
          >
            <div className='task-edit__header'>
              <p className='task-edit__title'>{inputs.taskName}</p>
            </div>
            <div className='task-edit__body'>
              <div className='task-edit__description'>{inputs.taskDescription}</div>
              <div className='task-edit__dates'>
                {inputs.taskStart}
                {inputs.taskDeadline}
              </div>
              <div className='task-edit__members'>{inputs.members}</div>
            </div>
            <>
              {empty || (
                <Button classMod='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              )}
            </>
          </Form>
        )}
      </>
    );
  }
}

TaskEdit.defaultProps = {
  assignedTo: [],
  members: [],
  empty: false,
};

TaskEdit.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  taskName: PropTypes.string,
  taskDescription: PropTypes.string,
  taskStart: PropTypes.instanceOf(Date),
  taskDeadline: PropTypes.instanceOf(Date),
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      memberTaskId: PropTypes.string,
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  members: PropTypes.objectOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
  empty: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default TaskEdit;
