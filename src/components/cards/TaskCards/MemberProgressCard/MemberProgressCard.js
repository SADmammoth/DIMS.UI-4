import React from 'react';
import PropTypes from 'prop-types';

import CollapsableCard from '../../CollapsableCard';
import DateBadge from '../../../elements/DateBadge';
import Button from '../../../elements/Button';
import compareObjects from '../../../../helpers/compareObjects';
import dateTypes from '../../../../helpers/dateTypes';

function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, open, close, role, memberTaskId, userId } = props;

  return (
    <CollapsableCard id={id} className='task-progress' cardClass='task' collapsed={collapsed} open={open} close={close}>
      <CollapsableCard.Header>
        <CollapsableCard.Title>{taskName}</CollapsableCard.Title>
        <DateBadge type={dateTypes.trackStart} date={trackDate} />
      </CollapsableCard.Header>
      <CollapsableCard.Body>
        <CollapsableCard.Description>{trackNote}</CollapsableCard.Description>
        {(role === 'admin' || role === 'mentor') && (
          <Button classMod='ghost' link={`/members/${userId}/tasks/id${memberTaskId}`}>
            Show in tasks
          </Button>
        )}
      </CollapsableCard.Body>
    </CollapsableCard>
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
  role: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  memberTaskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default React.memo(MemberProgressCard, compareObjects);
