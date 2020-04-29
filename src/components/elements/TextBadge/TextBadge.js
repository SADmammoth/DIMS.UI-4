import React from 'react';
import PropTypes from 'prop-types';

function TextBadge(props) {
  const { children } = props;
  return <div className='text-badge'>{children}</div>;
}

TextBadge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TextBadge;
