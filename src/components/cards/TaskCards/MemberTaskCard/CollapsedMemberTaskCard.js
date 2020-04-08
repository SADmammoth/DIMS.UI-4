import React from 'react';
import PropTypes from 'prop-types';

function CollapsedMemberTaskCard(props) {
  const { taskName, onClick } = props;
  return (
    <div className='task-card__header'>
      <p role='menu' className='interactive task-card__title' onClick={onClick}>
        {taskName}
      </p>
    </div>
  );
}

CollapsedMemberTaskCard.propTypes = {
  taskName: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
};

export default CollapsedMemberTaskCard;
