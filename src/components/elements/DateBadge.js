import React from 'react';
import PropTypes from 'prop-types';

function DateBadge(props) {
  const { date } = props;
  return <time>{date.toLocaleDateString()}</time>;
}

DateBadge.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default DateBadge;
