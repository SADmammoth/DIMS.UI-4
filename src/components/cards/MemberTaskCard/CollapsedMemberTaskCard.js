import React from 'react';
import PropTypes from 'prop-types';

function CollapsedMemberTaskCard(props) {
  const { taskName, onClick } = props;
  return (
    <div className='task-card__header'>
      <button type='button' className='button_invisible task-card__title' onClick={onClick}>
        {taskName}
      </button>
    </div>
  );
}

CollapsedMemberTaskCard.propTypes = {
  taskName: PropTypes.string.isRequired,

  onClick: PropTypes.func.isRequired,
};

export default CollapsedMemberTaskCard;
