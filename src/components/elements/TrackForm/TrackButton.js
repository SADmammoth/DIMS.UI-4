import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import TrackForm from './TrackForm';

function TaskEditButton(props) {
  const modal = React.createRef();
  return (
    <>
      <Button
        classMod='secondary'
        onClick={() => {
          modal.current.handleShow();
        }}
      >
        {props.children || props.buttonContent}
      </Button>
      <Modal ref={modal} className='track-create'>
        <TrackForm {...props} />
      </Modal>
    </>
  );
}

TaskEditButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  ...TrackForm.propTypes,
};

export default TaskEditButton;
