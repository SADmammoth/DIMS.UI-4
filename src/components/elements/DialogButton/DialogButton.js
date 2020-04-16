import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import ButtonGroup from '../ButtonGroup';

function DialogButton(props) {
  const modal = React.createRef();

  const onClick = () => {
    modal.current.handleShow();
  };

  const onCancel = () => {
    modal.current.handleClose();
  };

  const {
    buttonContent,
    buttonClassMod,
    dialogValue,
    onSubmit,
    message,
    confirmButtonClassMod,
    confirmButtonContent,
  } = props;

  return (
    <>
      <Modal ref={modal} className='dialog'>
        <p className='dialog__head'>{message}</p>
        <ButtonGroup>
          <Form
            inputs={[{ type: 'hidden', name: 'dialogValue', value: dialogValue }]}
            onSubmit={onSubmit}
            submitButton={<Button classMod={confirmButtonClassMod}>{confirmButtonContent}</Button>}
          />
          <Button classMod='ghost' onClick={onCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </Modal>
      <Button classMod={buttonClassMod} onClick={onClick}>
        {buttonContent}
      </Button>
    </>
  );
}

DialogButton.propTypes = {
  message: PropTypes.string.isRequired,
  confirmButtonClassMod: PropTypes.string.isRequired,
  confirmButtonContent: PropTypes.string.isRequired,
  buttonContent: PropTypes.any.isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  dialogValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DialogButton;
