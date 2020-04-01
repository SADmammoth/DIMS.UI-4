import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from './Button';
import TaskEdit from './TaskEdit';
import Modal from './Modal';

function TaskEditButton(props) {
  const modal = React.createRef();
  return (
    <>
      <Button
        classMod='secondary'
        content='Edit'
        onClick={() => {
          props.history.push(`/tasks/edit/${props.taskID}`);
        }}
      />
      <Modal ref={modal} show={props.show} className='task-edit'>
        <TaskEdit {...props} />
      </Modal>
    </>
  );
}

TaskEditButton.propTypes = {
  ...TaskEdit.propTypes,
};

export default TaskEditButton;
