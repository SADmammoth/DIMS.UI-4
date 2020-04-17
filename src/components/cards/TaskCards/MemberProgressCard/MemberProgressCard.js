import React from 'react';
import PropTypes from 'prop-types';

import CollapsableCard from '../../CollapsableCard';
import DateBadge from '../../../elements/DateBadge';
import Button from '../../../elements/Button/Button';

function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, open, close } = props;

  return (
    <CollapsableCard id={id} className='task-progress' cardClass='task' collapsed={collapsed} open={open} close={close}>
      <CollapsableCard.Header>
        <CollapsableCard.Title>{taskName}</CollapsableCard.Title>
        <DateBadge type={DateBadge.DateTypes.trackStart} date={trackDate} />
      </CollapsableCard.Header>
      <CollapsableCard.Body>
        <CollapsableCard.Description>{trackNote}</CollapsableCard.Description>
        {(role === 'admin' || role === 'mentor') && (
          <Button classMod='ghost' link={`/tasks/${taskID}`}>
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
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default React.memo(MemberProgressCard, areEqual);
