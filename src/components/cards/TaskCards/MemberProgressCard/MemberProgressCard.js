import React from 'react';
import PropTypes from 'prop-types';

import CollapsedMemberProgressCard from './CollapsedMemberProgressCard';
import compareObjects from '../../../../helpers/compareObjects';

function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, open, close } = props;
  const onClick = (collapsed) => {
    collapsed ? open(id) : close(id);
  };

  return (
    <article className={`task-progress task-card ${collapsed ? '' : 'open'}`}>
      <CollapsedMemberProgressCard taskName={taskName} trackDate={trackDate} onClick={onClick} collapsed={collapsed} />
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

export default React.memo(MemberProgressCard, compareObjects);
