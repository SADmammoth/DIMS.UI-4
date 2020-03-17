import React from 'react';
import PropTypes from 'prop-types';
import CollapsedMemberTaskCard from './CollapsedMemberTaskCard';
import DateBadge from '../../elements/DateBadge';
import Button from '../../elements/Button';

function MemberTaskCard(props) {
  const { taskName, taskDescription, state, taskStart, taskDeadline } = props;
  return props.collapsed ? (
    <article className={`task-card_${state}`} onClick={() => props.open(props.id)}>
      <CollapsedMemberTaskCard taskName={taskName} />
    </article>
  ) : (
    <article className={`task-card_${state}`} onClick={() => props.close(props.id)}>
      <CollapsedMemberTaskCard taskName={taskName} />
      <div className='task-card__body'>
        <div className='task-card__dates'>
          <DateBadge type='startDate' date={taskStart} />
          <DateBadge type='endDate' date={taskDeadline} />
        </div>
        <p className='task-card__description'>{taskDescription}</p>
        <div className='button-block'>
          <Button classMod='primary'>
            <i className='icon-track' />
            <span>Track</span>
          </Button>
          <Button classMod='error' content='Delete' />
          <Button classMod='success' content='Edit' />
        </div>
      </div>
    </article>
  );
}

MemberTaskCard.propTypes = {
  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
};

export default MemberTaskCard;
