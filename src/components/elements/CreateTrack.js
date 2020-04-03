import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Button from './Button';
import DirectionBadge from './DirectionBadge';
import Validator from '../../helpers/Validator';

function CreateTrack(props) {
  const { taskName, trackDate, trackNote } = props;
  const [inputs, setInputs] = useState({});
  return (
    <>
      <Form
        inputs={[
          {
            type: 'textarea',
            name: 'trackNote',
            label: 'Track note',
            minSymbols: 50,
            maxSymbols: 600,
            value: trackNote,
          },
          {
            type: 'text',
            name: 'trackDate',
            label: 'Track date',
            value: `${trackDate.getMonth()}-${trackDate.getDate()}-${trackDate.getFullYear()}`,
            byCharValidator: Validator.dateByChar,
          },
        ]}
        onInputsUpdate={setInputs}
        submitButton={<Button content='Confirm' classMod='secondary' />}
      >
        <div className='task-edit__header'>
          <p className='task-edit__title'>{taskName}</p>
          <DirectionBadge direction='Track' />
        </div>
        <div className='task-edit__body'>
          <div className='task-edit__description' style={{ width: '100%' }}>
            {inputs.trackNote}
          </div>
        </div>
      </Form>
    </>
  );
}

CreateTrack.propTypes = {
  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
};

export default CreateTrack;
