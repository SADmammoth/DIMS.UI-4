import React from 'react';
import PropTypes from 'prop-types';
import CollapsedMemberProgressCard from './CollapsedMemberProgressCard';
import Button from '../../elements/Button';
import { ReactComponent as TrackIcon } from '../../../assets/icons/Track.svg';

function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id } = props;
  function onClick() {
    if (collapsed) {
      props.open(id);
    } else {
      props.close(id);
    }
  }

  return (
    <article className={`task-progress task-card ${collapsed ? '' : 'open'}`}>
      <CollapsedMemberProgressCard taskName={taskName} trackDate={trackDate} onClick={onClick} />
      {!collapsed && (
        <>
          <div className='task-card__body'>
            <p className='task-card__description'>{trackNote}</p>
            <div className='button-block'>
              <Button classMod='primary'>
                <TrackIcon className='icon-track' />
                <span>Track</span>
              </Button>
              <Button classMod='secondary' content='Delete' />
              <Button classMod='secondary' content='Edit' />
            </div>
          </div>
        </>
      )}
    </article>
  );
}

MemberProgressCard.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
};

export default MemberProgressCard;
