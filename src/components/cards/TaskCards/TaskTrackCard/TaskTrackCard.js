import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '../../../elements/Button';
import { TrackButton } from '../../../elements/TaskForms/TrackForm';
import ButtonGroup from '../../../elements/ButtonGroup';
import CollapsibleCard from '../../CollapsibleCard';
import DateBadge from '../../../elements/DateBadge';
import DialogButton from '../../../elements/DialogButton';
import compareObjects from '../../../../helpers/compareObjects';
import dateTypes from '../../../../helpers/dateTypes';
import Client from '../../../../helpers/Client';

function TaskTrackCard(props) {
  const {
    match: {
      params: { id: userId },
    },
    taskName,
    trackNote,
    trackDate,
    collapsed,
    id,
    memberTaskId,
    open,
    close,
    reload,
  } = props;

  const onDelete = ({ dialogValue }) => {
    return Client.deleteTrack(dialogValue).then((response) => {
      reload();
      return response;
    });
  };

  const onEdit = ({ trackDate, trackNote }) => {
    return Client.editTrack(id, trackDate, trackNote).then((response) => {
      reload();
      return response;
    });
  };

  return (
    <CollapsibleCard id={id} cardClass='task' collapsed={collapsed} open={open} close={close}>
      <CollapsibleCard.Header>
        <CollapsibleCard.Title>{taskName}</CollapsibleCard.Title>
        <DateBadge type={dateTypes.trackStart} date={trackDate} />
      </CollapsibleCard.Header>
      <CollapsibleCard.Body>
        <CollapsibleCard.Description>{trackNote}</CollapsibleCard.Description>
        <ButtonGroup>
          <DialogButton
            buttonClassMod='secondary'
            buttonContent='Delete'
            message={
              <>
                Are you confident, you want to delete track <b>{taskName}</b>?
              </>
            }
            confirmButtonClassMod='error'
            confirmButtonContent='Delete'
            dialogValue={id}
            onSubmit={onDelete}
          />
          <TrackButton
            buttonClassMod='secondary'
            taskName={taskName}
            trackDate={trackDate}
            trackNote={trackNote}
            buttonContent='Edit'
            onSubmit={onEdit}
          />
          <Button classMod='ghost' link={`/members/${userId}/tasks/id${memberTaskId}`} content='Show in tasks' />
        </ButtonGroup>
      </CollapsibleCard.Body>
    </CollapsibleCard>
  );
}

TaskTrackCard.propTypes = {
  id: PropTypes.string.isRequired,
  memberTaskId: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

  taskName: PropTypes.string.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.instanceOf(Date).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  reload: PropTypes.func.isRequired,
};

export default withRouter(React.memo(TaskTrackCard, compareObjects));
