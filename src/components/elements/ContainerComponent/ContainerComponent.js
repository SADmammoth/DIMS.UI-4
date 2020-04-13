import React from 'react';
import PropTypes from 'prop-types';

function ContainerComponent(props) {
  const { fullwidth, display, children } = props;
  return <div className={`container${fullwidth ? ' fullwidth' : ''}${display ? ` ${display}` : ''}`}>{children}</div>;
}

ContainerComponent.propTypes = {
  fullwidth: PropTypes.bool.isRequired,
  children: PropTypes.any,
  display: PropTypes.string,
};

export default ContainerComponent;
