import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function Button(props) {
  return (
    <button
      className={`button button${`_${props.classMod}` || ''}`}
      type={props.type}
      onClick={
        props.onClick ||
        function() {
          props.history.push(props.link);
        }
      }
    >
      {props.content || props.children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  history: PropTypes.any,
  classMod: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.objectOf(PropTypes.object)]),
};

Button.defaultProps = {
  type: 'button',
};

export default withRouter(Button);
