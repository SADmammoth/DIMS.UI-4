import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import taskEditInputsAttributes from './taskEditInputsAttributes';
import Spinner from '../../Spinner';

class TaskEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputs: {}, loading: false };
  }

  render() {
    const { onSubmit } = this.props;
    const { inputs, loading } = this.state;

    const onSubmitHandler = (data) => {
      return onSubmit(data)
        .then((res) => {
          this.setState({ loading: false });
          return res;
        })
        .then((res) => {
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
          </Form>
        )}
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
  onSubmit: PropTypes.func.isRequired,
};

export default TaskEdit;
