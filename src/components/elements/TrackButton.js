import React from 'react';
import Button from './Button';
import TaskEdit from './TaskEdit';
import Modal from './Modal';
import CreateTrack from './CreateTrack';
import { ReactComponent as TrackIcon } from '../../assets/icons/Track.svg';

function TaskEditButton(props) {
  const modal = React.createRef();
  return (
    <>
      <Button
        classMod='primary'
        onClick={() => {
          modal.current.handleShow();
        }}
      >
        <TrackIcon className='icon-track' />
        <span>Track</span>
      </Button>
      <Modal ref={modal} className='track-create'>
        <CreateTrack {...props} />
      </Modal>
    </>
  );
}

TaskEditButton.propTypes = {
  ...TaskEdit.propTypes,
};

export default TaskEditButton;
