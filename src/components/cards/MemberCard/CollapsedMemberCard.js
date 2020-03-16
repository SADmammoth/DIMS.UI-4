import React from 'react';
import PropTypes from 'prop-types';

import DirectionBadge from '../../elements/DirectionBadge';
import DateBadge from '../../elements/DateBadge';

function CollapsedMemberCard(props) {
  const { fullName, age, direction, startDate } = props;
  const names = fullName.match(/^([^\s]*)\s([^\s]*)/);

  return (
    <div className='member-card__header'>
      <p className='member-card__header__title'>
        <b>{names[1]}</b>
        {` ${names[2]}, ${age}`}
      </p>
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
};

export default CollapsedMemberCard;
