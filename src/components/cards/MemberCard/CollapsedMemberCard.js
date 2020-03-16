import React from 'react';
import PropTypes from 'prop-types';

import DirectionBadge from '../../elements/DirectionBadge';
import DateBadge from '../../elements/DateBadge';

function CollapsedMemberCard(props) {
  const { firstName, lastName, birthDate, direction, startDate, onClick } = props;
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <div className='member-card__header'>
      <button type='button' className='button_invisible member-card__header__title' onClick={onClick}>
        <b>{firstName}</b>
        {` ${lastName}, ${age}`}
      </button>
      <DateBadge date={startDate} type='startDate' />
      <DirectionBadge direction={direction} />
    </div>
  );
}

CollapsedMemberCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CollapsedMemberCard;
