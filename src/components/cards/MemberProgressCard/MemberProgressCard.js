import React from 'react';
import PropTypes from 'prop-types';

import CollapsedMemberProgressCard from './CollapsedMemberProgressCard';

function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, open, close } = props;
  function onClick() {
    if (collapsed) {
      open(id);
    } else {
      close(id);
    }
  }

  return (
    <article className={`task-progress task-card ${collapsed ? '' : 'open'}`}>
      <CollapsedMemberProgressCard taskName={taskName} trackDate={trackDate} onClick={onClick} />
      {!collapsed && (
        <>
          <div className='task-card__body'>
            <p className='task-card__description'>{trackNote}</p>
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
