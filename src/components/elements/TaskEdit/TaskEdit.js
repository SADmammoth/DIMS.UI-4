import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import Button from '../Button';
import Validator from '../../../helpers/Validator';

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: {} };
  }

  render() {
    const { taskName, taskDescription, taskStart, taskDeadline, assignedTo, members } = this.props;
    const { inputs } = this.state;
    return (
      <>
        <Form
          inputs={[
            {
              type: 'textarea',
              name: 'taskDescription',
              label: 'Task description',
              minSymbols: 50,
              maxSymbols: 600,
              value: taskDescription,
            },
            {
              type: 'text',
              name: 'taskStart',
              label: 'Task start',
              value: `${taskStart.getMonth()}-${taskStart.getDate()}-${taskStart.getFullYear()}`,
              byCharValidator: Validator.dateByChar,
            },
            {
              type: 'text',
              name: 'taskDeadline',
              label: 'Task deadline',
              value: `${taskDeadline.getMonth()}-${taskDeadline.getDate()}-${taskDeadline.getFullYear()}`,
              byCharValidator: Validator.dateByChar,
            },
            {
              type: 'checkbox',
              name: 'members',
              label: 'Assigned to members',
              value: assignedTo.map((member) => `${member.firstName} ${member.lastName}`),
              valueOptions: members.map((member) => `${member.firstName} ${member.lastName}`),
            },
          ]}
          onInputsUpdate={(inputsComponents) => this.setState({ inputs: inputsComponents })}
          submitButton={<Button content='Confirm' classMod='secondary' />}
        >
          <div className='task-edit__header'>
            <p className='task-edit__title'>{taskName}</p>
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
  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      memberTaskID: PropTypes.string,
      userID: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  members: PropTypes.arrayOf(PropTypes.object),
};

export default TaskEdit;
