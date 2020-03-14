import React from 'react';
import PropTypes from 'prop-types';

function DirectionBadge(props) {
  const { direction } = props;
  return <div>{direction}</div>;
}

DirectionBadge.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default DirectionBadge;
