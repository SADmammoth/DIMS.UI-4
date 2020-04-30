import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../../helpers/Client';
import Button from '../Button';

function ChangeStateButton({ taskId, userId, state, buttonClassMod, buttonContent, children }) {
  const onClickHandler = () => {
    Client.setUserTaskState(taskId, userId, state);
  };

  return (
    <Button classMod={buttonClassMod} onClick={onClickHandler} content={buttonContent}>
      {children}
    </Button>
  );
}

ChangeStateButton.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  state: PropTypes.string.isRequired,
  buttonClassMod: PropTypes.string,
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default ChangeStateButton;
