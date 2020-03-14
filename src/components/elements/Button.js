import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function Button(props) {
  return (
    <button
      className='button'
      type={props.type}
      onClick={
        props.onClick ||
        function() {
          props.history.push(props.link);
        }
      }
    >
      {props.content}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  history: PropTypes.any,
};

Button.defaultProps = {
  type: 'button',
  content: 'Button',
};

export default withRouter(Button);
