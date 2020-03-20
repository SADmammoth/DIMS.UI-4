import React from 'react';
import PropTypes from 'prop-types';

function Container(props) {
  return <div className={`container${props.fullwidth ? ' fullwidth' : ''}`}>{props.children}</div>;
}

Container.propTypes = {
  fullwidth: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default Container;
