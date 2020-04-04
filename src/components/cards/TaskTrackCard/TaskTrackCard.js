import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CollapsedTaskTrackCard from './CollapsedTaskTrackCard';
import Button from '../../elements/Button';
import { TrackButton } from '../../elements/TrackForm';

function MemberTaskCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, memberTaskID } = props;
  function onClick() {
    if (collapsed) {
      props.open(id);
    } else {
      props.close(id);
    }
  }

  return (
    <article className={`task-card ${collapsed ? '' : 'open'}`}>
      <CollapsedTaskTrackCard taskName={taskName} trackDate={trackDate} onClick={onClick} />
      {collapsed || (
        <>
          <div className='task-card__body'>
            <p className='task-card__description'>{trackNote}</p>
            <div className='button-block'>
              <Button classMod='secondary' content='Delete' />
              <TrackButton taskName={taskName} trackDate={trackDate} trackNote={trackNote} buttonContent='Edit' />
              <Button
                classMod='ghost'
                link={`/members/${props.match.params.id}/tasks/${memberTaskID}`}
                content='Show in tasks'
              />
            </div>
          </div>
        </>
      )}
    </article>
  );
}

MemberTaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  memberTaskID: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
};

export default withRouter(MemberTaskCard);
