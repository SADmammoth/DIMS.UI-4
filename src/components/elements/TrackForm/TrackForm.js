import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import Button from '../Button';
import DirectionBadge from '../DirectionBadge';
import Validator from '../../../helpers/Validator';

class TrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: {} };
  }

  render() {
    const { taskName, trackDate, trackNote } = this.props;
    const { inputs } = this.state;
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
          onInputsUpdate={(inputsComponents) => this.setState({ inputs: inputsComponents })}
          submitButton={<Button content='Confirm' classMod='secondary' />}
        >
          <div className='task-edit__header'>
            <p className='task-edit__title'>{taskName}</p>
            <DirectionBadge direction='Track' />
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
  }
}

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
