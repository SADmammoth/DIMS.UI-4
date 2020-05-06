import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import Button from '../../Button';
import TextBadge from '../../TextBadge';
import trackFormInputsAttributes from './trackFormInputsAttributes';

const TrackForm = (props) => {
  const { taskName } = props;
  const [inputs, setInputs] = useState({});

  return (
    <>
      <Form
        inputs={trackFormInputsAttributes(props)}
        onInputsUpdate={setInputs}
        submitButton={<Button content='Confirm' classMod='secondary' />}
      >
        <div className='task-edit__header'>
          <p className='task-edit__title'>{taskName}</p>
          <TextBadge>Track</TextBadge>
        </div>
        <div className='task-edit__body'>
          <div className='task-edit__dates'>{inputs.trackDate}</div>
          <div
            className='task-edit__description'
            style={{
              width: '100%',
            }}
          >
            {inputs.trackNote}
          </div>
        </div>
      </Form>
    </>
  );
};
TrackForm.defaultProps = {
  trackDate: new Date(),
  trackNote: '',
};

TrackForm.propTypes = {
  taskName: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date),
  trackNote: PropTypes.string,
};

export default TrackForm;
