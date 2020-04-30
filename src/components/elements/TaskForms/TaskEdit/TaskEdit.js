import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import taskEditInputsAttributes from './taskEditInputsAttributes';
import Client from '../../../../helpers/Client';
import compareObjects from '../../../../helpers/compareObjects';
import Validator from '../../../../helpers/Validator';

class TaskEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputs: {} };
  }

  render() {
    const { assignedTo, taskId } = this.props;
    const { inputs } = this.state;

    const onSubmit = async ({ taskName, taskDescription, taskStart, taskDeadline, members }) => {
      if (
        !compareObjects(
          members.split(','),
          assignedTo.map((el) => el.userId),
        )
      ) {
        await Client.assignTask(taskId, members.split(','));
      }
      return Client.editTask(
        taskId,
        taskName,
        taskDescription,
        Validator.dateByMask(taskStart, 'dd-MM-yyyy'),
        Validator.dateByMask(taskDeadline, 'dd-MM-yyyy'),
      );
    };

    return (
      <>
        <Form
          inputs={taskEditInputsAttributes(this.props)}
          onInputsUpdate={(inputsComponents) => this.setState({ inputs: inputsComponents })}
          onSubmit={onSubmit}
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
        </Form>
      </>
    );
  }
}

TaskEdit.defaultProps = {
  assignedTo: [],
  members: [],
};

TaskEdit.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      memberTaskId: PropTypes.string,
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  members: PropTypes.arrayOf(PropTypes.object),
};

export default TaskEdit;
