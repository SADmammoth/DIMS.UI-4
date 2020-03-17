import React from 'react';
import PropTypes from 'prop-types';

function CollapsedMemberTaskCard(props) {
  const { taskName } = props;
  return (
    <div className='task-card__header'>
      <p className='task-card__title'>{taskName}</p>
    </div>
  );
}

CollapsedMemberTaskCard.propTypes = {
  taskName: PropTypes.string.isRequired,
};

export default CollapsedMemberTaskCard;
