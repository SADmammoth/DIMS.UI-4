import React from 'react';
import PropTypes from 'prop-types';

function ContainerComponent(props) {
  const { fullWidth, display, children, className } = props;
  return (
    <div className={`container${fullWidth ? ' fullwidth' : ''}${` ${display}`}${` ${className}`}`}>{children}</div>
  );
}

ContainerComponent.defaultProps = {
  fullWidth: false,
  display: '',
  className: '',
};

ContainerComponent.propTypes = {
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  display: PropTypes.string,
  className: PropTypes.string,
};

export default ContainerComponent;
