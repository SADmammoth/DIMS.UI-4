import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../../../elements/Button';
import { TrackButton } from '../../../elements/TaskForms/TrackForm';
import ButtonGroup from '../../../elements/ButtonGroup/ButtonGroup';
import CollapsableCard from '../../CollapsableCard/CollapsableCard';
import DateBadge from '../../../elements/DateBadge';
import DialogButton from '../../../elements/DialogButton/DialogButton';

function TaskTrackCard(props) {
  const { taskName, trackNote, trackDate, collapsed, id, memberTaskID, open, close } = props;

  return (
    <CollapsableCard id={id} cardClass='task' collapsed={collapsed} open={open} close={close}>
      <CollapsableCard.Header>
        <CollapsableCard.Title>{taskName}</CollapsableCard.Title>
        <DateBadge type='trackStart' date={trackDate} />
      </CollapsableCard.Header>
      <CollapsableCard.Body>
        <CollapsableCard.Description>{trackNote}</CollapsableCard.Description>
        <ButtonGroup>
          <DialogButton
            buttonClassMod='secondary'
            buttonContent='Delete'
            message={
              <p>
                Are you confident, you want to delete track <b>{taskName}</b>?
              </p>
            }
            confirmButtonClassMod='error'
            confirmButtonContent='Delete'
            dialogValue={id}
            onSubmit={({ dialogValue }) => console.log(dialogValue)}
          />
          <TrackButton
            buttonClassMod='secondary'
            taskName={taskName}
            trackDate={trackDate}
            trackNote={trackNote}
            buttonContent='Edit'
          />
          <Button
            classMod='ghost'
            link={`/members/${props.match.params.id}/tasks/${memberTaskID}`}
            content='Show in tasks'
          />
        </ButtonGroup>
      </CollapsableCard.Body>
    </CollapsableCard>
  );
}

TaskTrackCard.propTypes = {
  id: PropTypes.string.isRequired,
  memberTaskID: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default withRouter(React.memo(TaskTrackCard, areEqual));
