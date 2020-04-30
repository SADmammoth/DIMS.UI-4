import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import AssignForm from './AssignForm';
import Client from '../../../helpers/Client/Client';
import checkboxValueSeparator from '../../../helpers/checkboxValueSeparator';

function AssignButton(props) {
  const { taskId, buttonClassMod, children, reload, buttonContent, ...assignFormProps } = props;
  const modal = React.createRef();
  const showModal = () => {
    modal.current.handleShow();
  };

  const closeModal = () => {
    modal.current.handleClose();
  };

  const assignUsers = ({ members }) => {
    return Client.assignTask(taskId, checkboxValueSeparator(members)).then((res) => {
      closeModal();
      reload();
      return res;
    });
  };

  return (
    <>
      <Modal ref={modal}>
        <AssignForm onSubmit={assignUsers} {...assignFormProps} />
      </Modal>
      <Button classMod={buttonClassMod} onClick={showModal} content={buttonContent}>
        {children}
      </Button>
    </>
  );
}

AssignButton.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonClassMod: PropTypes.string,
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  reload: PropTypes.func.isRequired,
  ...AssignForm.propTypes,
};

export default AssignButton;
