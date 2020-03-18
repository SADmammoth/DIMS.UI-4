import React from 'react';
import DateBadge from '../../elements/DateBadge';

export default function CollapsedMemberProgressCard(props) {
  const { taskName, trackDate } = props;
  return (
    <div className='task-card__header'>
      <p className='task-card__title'>{taskName}</p>
      <DateBadge type='trackStart' date={trackDate} />
    </div>
  );
}
