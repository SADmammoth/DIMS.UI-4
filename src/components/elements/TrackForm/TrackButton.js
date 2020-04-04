import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Modal from '../Modal';
import TrackForm from './TrackForm';

function TrackButton(props) {
  const modal = React.createRef();
  return (
    <>
      <Modal ref={modal} className='track-create'>
        <TrackForm {...props} />
      </Modal>
      <Button
        classMod={props.buttonClassMod}
        onClick={() => {
          modal.current.handleShow();
        }}
      >
        {props.children || props.buttonContent}
      </Button>
    </>
  );
}

TrackButton.propTypes = {
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  buttonClassMod: PropTypes.string.isRequired,
  ...TrackForm.propTypes,
};

export default TrackButton;
