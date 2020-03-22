import React from 'react';
import PropTypes from 'prop-types';
import CollapsedMemberProgressCard from './CollapsedMemberProgressCard';
import Button from '../../elements/Button';

function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id } = props;
  return (
    <article className={`task-progress task-card ${collapsed ? '' : 'open'}`}>
      <CollapsedMemberProgressCard
        taskName={taskName}
        trackDate={trackDate}
        onClick={() => (collapsed ? props.open(id) : props.close(id))}
      />
      {collapsed || (
        <>
          <div className='task-card__body'>
            <p className='task-card__description'>{trackNote}</p>
            <div className='button-block'>
              <Button classMod='primary'>
                <i className='icon-track' />
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
