import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../../helpers/Client';
import Button from '../Button';

function ChangeStateButton({ taskId, userId, status, reload, buttonClassMod, buttonContent, children }) {
  const onClickHandler = () => {
    return Client.setUserTaskState(taskId, userId, status).then((res) => {
      reload();
      return res;
    });
  };

  return (
    <Button classMod={buttonClassMod} onClick={onClickHandler} content={children || buttonContent}>
      {children}
    </Button>
  );
}

ChangeStateButton.defaultProps = {
  buttonClassMod: 'primary',
  buttonContent: 'Change status',
  children: null,
};

ChangeStateButton.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  status: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
  buttonClassMod: PropTypes.string,
  buttonContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default ChangeStateButton;
