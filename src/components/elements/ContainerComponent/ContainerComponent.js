import React from 'react';
import PropTypes from 'prop-types';

function ContainerComponent(props) {
  return (
    <div className={`container${props.fullwidth ? ' fullwidth' : ''}${props.display ? ` ${props.display}` : ''}`}>
      {props.children}
    </div>
  );
}

ContainerComponent.propTypes = {
  fullwidth: PropTypes.bool.isRequired,
  children: PropTypes.any,
  display: PropTypes.string,
};

export default ContainerComponent;
