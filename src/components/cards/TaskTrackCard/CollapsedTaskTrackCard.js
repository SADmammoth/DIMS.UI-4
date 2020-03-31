import React from 'react';
import PropTypes from 'prop-types';
import DateBadge from '../../elements/DateBadge';

function CollapsedTaskTrackCard(props) {
  const { taskName, trackDate, onClick } = props;
  return (
    <div className='task-card__header'>
      <p role='menu' className='interactive task-card__title' onClick={onClick}>
        {taskName}
      </p>
      <DateBadge type='trackStart' date={trackDate} />
    </div>
  );
}

CollapsedTaskTrackCard.propTypes = {
  taskName: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,

  onClick: PropTypes.func.isRequired,
};

export default CollapsedTaskTrackCard;
