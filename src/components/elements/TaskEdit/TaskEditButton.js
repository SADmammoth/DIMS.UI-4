import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import TaskEdit from './TaskEdit';
import Modal from '../Modal';

function TaskEditButton(props) {
  const modal = React.createRef();
  return (
    <>
      <Button
        classMod='secondary'
        onClick={() => {
          props.history.push(`/tasks/edit/${props.taskID}`);
        }}
      >
        {props.children || props.buttonContent}
      </Button>
      <Modal ref={modal} show={props.show} className='task-edit'>
        <TaskEdit {...props} />
      </Modal>
    </>
  );
}

TaskEditButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  ...TaskEdit.propTypes,
};

export default TaskEditButton;
