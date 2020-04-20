import React from 'react';
import PropTypes from 'prop-types';

import DirectionBadge from '../../elements/DirectionBadge';
import DateBadge from '../../elements/DateBadge';

function CollapsedMemberCard(props) {
  const { firstName, lastName, birthDate, direction, startDate, onClick, collapsed } = props;
  const age = calculateAge(birthDate);

  const onClickHandler = () => {
    onClick(collapsed);
  };

  return (
    <div className='member-card__header'>
      <p role='menu' className='interactive member-card__header__title' onClick={onClickHandler}>
        <b>{firstName}</b>
        {` ${lastName}, ${age}`}
      </p>
      <DateBadge date={startDate} type={DateBadge.DateTypes.startDate} />
      <DirectionBadge direction={direction} />
    </div>
  );
}

CollapsedMemberCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  collapsed: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,
};

function calculateAge(birthDate) {
  return new Date().getFullYear() - birthDate.getFullYear();
}

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default React.memo(CollapsedMemberCard, areEqual);
