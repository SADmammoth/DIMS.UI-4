import React from 'react';
import PropTypes from 'prop-types';
import CollapsedMemberTaskCard from './CollapsedMemberTaskCard';
import DateBadge from '../../elements/DateBadge';
import Button from '../../elements/Button';

function MemberTaskCard(props) {
  const { taskName, taskDescription, state, taskStart, taskDeadline, collapsed, id } = props;
  return (
    <article className={`task-card task-card_${state.toLowerCase()} ${collapsed ? '' : 'open'}`}>
      <CollapsedMemberTaskCard taskName={taskName} onClick={() => (collapsed ? props.open(id) : props.close(id))} />
      {collapsed || (
        <>
          <div className='state'>{state}</div>
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
        </>
      )}
    </article>
  );
}

MemberTaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
};

export default MemberTaskCard;
