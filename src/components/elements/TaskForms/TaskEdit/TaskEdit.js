import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import taskEditInputsAttributes from './taskEditInputsAttributes';

class TaskEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputs: {} };
  }

  render() {
    const { taskName } = this.props;
    const { inputs } = this.state;
    return (
      <>
        <Form
<<<<<<< HEAD:src/components/elements/TaskForms/TaskEdit/TaskEdit.js
          inputs={taskEditInputsAttributes(this.props)}
=======
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
              mask: '99-99-999',
              maskType: 'invisible',
              byCharValidator: Validator.dateByChar,
            },
            {
              type: 'text',
              name: 'taskDeadline',
              label: 'Task deadline',
              value: `${taskDeadline.getMonth()}-${taskDeadline.getDate()}-${taskDeadline.getFullYear()}`,
              mask: '99-99-999',
              maskType: 'invisible',
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
>>>>>>> e59d15b... feat: input mask:src/components/elements/TaskEdit/TaskEdit.js
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
