import React from 'react';
import PropTypes from 'prop-types';

import DirectionBadge from '../../elements/DirectionBadge';
import DateBadge from '../../elements/DateBadge';

function CollapsedMemberCard(props) {
  const { fullName, age, direction, startDate } = props;
  const names = fullName.match(/^([^\s]*)\s([^\s]*)/);

  return (
    <div className='member-card__header'>
      <p>
        <b>{names[1]}</b>
        {` ${names[2]}, ${age}`}
      </p>
      <DirectionBadge direction={direction} />
      <DateBadge date={startDate} />
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
