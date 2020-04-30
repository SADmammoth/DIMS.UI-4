import React from 'react';
import PropTypes from 'prop-types';
import assignModalInputsAttributes from './assignModalInputsAttributes';
import Form from '../Form/Form';
import Button from '../Button/Button';
import Client from '../../../helpers/Client/Client';

function AssignForm(props) {
  const { taskId } = props;
  const assignUsers = ({ members }) => {
    return Client.assignTask(taskId.toString(), members.split(','));
  };

  return (
    <Form
      className='assign-form'
      inputs={assignModalInputsAttributes(props)}
      onSubmit={assignUsers}
      submitButton={<Button classMod='secondary'>Assign</Button>}
    />
  );
}

AssignForm.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  assignedTo: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
};

export default AssignForm;
