import React from 'react';
import CollapsedMemberProgressCard from './CollapsedMemberProgressCard';
import Button from '../../elements/Button';
import DateBadge from '../../elements/DateBadge';

export default function MemberProgressCard(props) {
  const { taskName, trackNote, trackDate } = props;
  return (
    <article
      className={`task-progress task-card ${props.collapsed ? '' : 'open'}`}
      onClick={() => props.open(props.id)}
    >
      <CollapsedMemberProgressCard taskName={taskName} trackDate={trackDate} />
      {props.collapsed || (
        <>
          <div className='task-card__body'>
            <p className='task-card__description'>{trackNote}</p>
            <div className='button-block'>
              <Button classMod='primary'>
                <i className='icon-track' />
                <span>Track</span>
              </Button>
              <Button classMod='error' content='Delete' />
              <Button classMod='success' content='Edit' />
            </div>
          </div>
        </>
      )}
    </article>
  );
}
