import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function Button(props) {
  function onClick(event) {
    props.onClick ? props.onClick(event) : props.history.push(props.link);
  }
  // TODO
  return (
    <button className={`button button${`_${props.classMod}` || ''}`} type={props.type} onClick={onClick}>
      {props.content || props.children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  history: PropTypes.any.isRequired,
  classMod: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.objectOf(PropTypes.object)]),
};

export default withRouter(Button);
