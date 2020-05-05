import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../../Button';
import TaskEdit from './TaskEdit';
import Modal from '../../Modal';

function TaskEditButton(props) {
  const modal = React.createRef();

  const { onSubmit, buttonContent, buttonClassMod, reload, children, show, ...otherProps } = props;

  const openModal = () => {
    props.history.push(`/tasks/id${props.taskId}/edit`);
    modal.current.handleShow();
  };

  const onClose = () => {
    props.history.goBack();
  };

  const handleClose = () => {
    modal.current.handleClose();
  };

  const onSubmitHandler = (data) => {
    return onSubmit(data)
      .then((res) => {
        handleClose();
        reload();
        return res;
      })
      .then((res) => {
        return res;
      });
  };

  return (
    <>
      <Button classMod={buttonClassMod} onClick={openModal}>
        {children || buttonContent}
      </Button>
      <Modal ref={modal} show={show} onClose={onClose} className='task-edit-modal'>
        <TaskEdit onSubmit={onSubmitHandler} {...otherProps} handleClose={handleClose} />
      </Modal>
    </>
  );
}

const { handleClose, ...taskEditProps } = TaskEdit.propTypes;

TaskEditButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
  ...taskEditProps,
};

export default withRouter(TaskEditButton);
