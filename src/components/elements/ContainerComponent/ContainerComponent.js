import React from 'react';
import PropTypes from 'prop-types';

function ContainerComponent(props) {
  const { fullwidth, display, children, className } = props;
  return (
    <div className={`container${fullwidth ? ' fullwidth' : ''}${` ${display}`}${` ${className}`}`}>{children}</div>
  );
}

ContainerComponent.defaultProps = {
  fullwidth: false,
  display: '',
  className: '',
};

ContainerComponent.propTypes = {
  fullwidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  display: PropTypes.string,
  className: PropTypes.string,
};

export default ContainerComponent;
