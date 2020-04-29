import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../../Button';
import TaskEdit from './TaskEdit';
import Modal from '../../Modal';

function TaskEditButton(props) {
  const modal = React.createRef();

  const openModal = () => {
    props.history.push(`/tasks/${props.taskID}/edit`);
    modal.current.handleShow();
  };

  const onClose = () => {
    props.history.goBack();
  };

  const { buttonClassMod, buttonContent, children, show } = props;
  return (
    <>
      <Button classMod={buttonClassMod} onClick={openModal}>
        {children || buttonContent}
      </Button>
      <Modal ref={modal} show={show} className='task-edit' onClose={onClose}>
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

export default withRouter(TaskEditButton);
