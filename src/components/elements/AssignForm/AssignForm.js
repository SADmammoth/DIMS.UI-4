import React from 'react';
import PropTypes from 'prop-types';
import assignModalInputsAttributes from './assignModalInputsAttributes';
import Form from '../Form/Form';
import Button from '../Button/Button';
function AssignForm(props) {
  const { onSubmit } = props;

  return (
    <Form
      className='assign-form'
      inputs={assignModalInputsAttributes(props)}
      onSubmit={onSubmit}
      submitButton={<Button classMod='secondary'>Assign</Button>}
    />
  );
}

AssignForm.propTypes = {
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  assignedTo: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AssignForm;
