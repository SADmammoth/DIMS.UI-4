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
        classMod={props.buttonClassMod}
        onClick={() => {
          props.history.push(`/tasks/edit/${props.taskID}`);
        }}
      >
        {props.children || props.buttonContent}
      </Button>
      <Modal
        ref={modal}
        show={props.show}
        className='task-edit'
        onClose={() => {
          props.history.goBack();
        }}
      >
        <TaskEdit {...props} />
      </Modal>
    </>
  );
}

TaskEditButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  ...TaskEdit.propTypes,
};

export default TaskEditButton;
