import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import AssignForm from './AssignForm';
import checkboxValueSeparator from '../../../helpers/checkboxValueSeparator';
import setUsersForTask from '../../../helpers/setUsersForTask';

function AssignButton(props) {
  const { taskId, buttonClassMod, children, reload, buttonContent, members, assignedTo } = props;
  const modal = React.createRef();

  const showModal = () => {
    modal.current.handleShow();
  };

  const closeModal = () => {
    modal.current.handleClose();
  };

  const assignUsers = ({ members, members_default }) => {
    return setUsersForTask(taskId, checkboxValueSeparator(members), checkboxValueSeparator(members_default)).then(
      (res) => {
        closeModal();
        reload();
        return res;
      },
    );
  };

  return (
    <>
      <Modal ref={modal}>
        <AssignForm onSubmit={assignUsers} taskId={taskId} members={members} assignedTo={assignedTo} />
      </Modal>
      <Button classMod={buttonClassMod} onClick={showModal} content={buttonContent}>
        {children}
      </Button>
    </>
  );
}

AssignButton.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  buttonClassMod: PropTypes.string,
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  reload: PropTypes.func.isRequired,
  assignedTo: PropTypes.array.isRequired,
  members: PropTypes.object.isRequired,
};

export default AssignButton;
