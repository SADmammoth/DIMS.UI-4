import React from 'react';
import PropTypes from 'prop-types';

function CollapsedMemberTaskCard(props) {
  const { taskName, onClick, collapsed } = props;

  const onClickHandler = () => {
    onClick(collapsed);
  };

  return (
    <div className='task-card__header'>
      <p role='menu' className='interactive task-card__title' onClick={onClickHandler}>
        {taskName}
      </p>
    </div>
  );
}

CollapsedMemberTaskCard.propTypes = {
  taskName: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default React.memo(CollapsedMemberTaskCard, areEqual);
