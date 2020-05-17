import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DateBadge from '../../../elements/DateBadge';
import Button from '../../../elements/Button';
import { ReactComponent as TrackIcon } from '../../../../assets/icons/Track.svg';
import { TaskEditButton } from '../../../elements/TaskForms/TaskEdit';
import { TrackButton } from '../../../elements/TaskForms/TrackForm';
import ButtonGroup from '../../../elements/ButtonGroup';
import CollapsibleCard from '../../CollapsibleCard';
import DialogButton from '../../../elements/DialogButton';
import { AssignButton } from '../../../elements/AssignForm';
import Client from '../../../../helpers/Client';
import ChangeStateButton from '../../../elements/ChangeStateButton';
import compareObjects from '../../../../helpers/compareObjects';
import editAndAssignTask from '../../../../helpers/editAndAssignTask';
import dateTypes from '../../../../helpers/dateTypes';
import store from '../../../../redux';

function MemberTaskCard(props) {
  const {
    taskName,
    userId,
    taskId,
    taskDescription,
    state,
    taskStart,
    taskDeadline,
    collapsed,
    id,
    taskSet,
    role,
    assignedTo,
    members,
    open,
    close,
    edit,
    reload,
  } = props;

  const assignedToIds = assignedTo.map((user) => user.userId);

  const onEdit = (data) => {
    return editAndAssignTask(store, data, taskId);
  };
  const onDelete = ({ dialogValue }) => {
    return Client.deleteTask(dialogValue);
  };
  const onTrack = ({ trackDate, trackNote }) => {
    return Client.createTrack(userId, id, trackDate, trackNote);
  };

  return (
    <CollapsibleCard
      id={id}
      cardClass='task'
      className={state ? `task-card_${state.toLowerCase()}` : null}
      collapsed={collapsed}
      open={open}
      close={close}
    >
      <CollapsibleCard.Header>
        <CollapsibleCard.Title>{taskName}</CollapsibleCard.Title>
      </CollapsibleCard.Header>
      {state && (
        <div className='state'>
          <span>{state}</span>
        </div>
      )}
      <CollapsibleCard.Body>
        <div className='task-card__dates'>
          <DateBadge type={dateTypes.startDate} date={taskStart} />
          <DateBadge type={dateTypes.endDate} date={taskDeadline} />
        </div>

        <CollapsibleCard.Description>{taskDescription}</CollapsibleCard.Description>
        {role === 'admin' && taskSet === 'all' && (
          <>
            {assignedTo.length ? (
              <>
                <h3>Assigned to:</h3>
                <ul className='inline-list'>
                  {assignedTo.map((user) => (
                    <li key={user.userId}>
                      <Link to={`/members/${user.userId}/tasks/id${user.memberTaskId}`}>
                        <b>{members[user.userId] ? members[user.userId].firstName : 'First name'}</b>
                        {` ${members[user.userId] ? members[user.userId].lastName : 'Last name'}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3>Task is not assigned yet</h3>
              </>
            )}
          </>
        )}

        <ButtonGroup>
          {role === 'member' && (
            <TrackButton reload={reload} taskName={taskName} onSubmit={onTrack} buttonClassMod='primary'>
              <TrackIcon className='icon-track' />
              <span>Track</span>
            </TrackButton>
          )}
          {(role === 'admin' || role === 'mentor') && taskSet === 'all' && (
            <AssignButton
              reload={reload}
              buttonClassMod='primary'
              taskId={taskId}
              assignedTo={assignedToIds}
              members={members}
            >
              <TrackIcon className='icon-tasks' />
              <span>Assign</span>
            </AssignButton>
          )}
          {(role === 'admin' || role === 'mentor') && taskSet === 'all' && (
            <>
              <DialogButton
                buttonClassMod='secondary'
                buttonContent='Delete'
                message={
                  <>
                    Are you confident, you want to delete task <b>{taskName}</b>?
                  </>
                }
                confirmButtonClassMod='error'
                confirmButtonContent='Delete'
                dialogValue={id}
                onSubmit={onDelete}
                reload={reload}
              />
              <TaskEditButton
                buttonClassMod='secondary'
                taskId={taskId}
                taskName={taskName}
                taskDescription={taskDescription}
                taskStart={taskStart}
                taskDeadline={taskDeadline}
                assignedTo={assignedTo}
                show={edit}
                members={members}
                onSubmit={onEdit}
                buttonContent='Edit'
                reload={reload}
              />
            </>
          )}
          {(role === 'admin' || role === 'mentor') && taskSet === 'user' && (
            <>
              <ChangeStateButton
                reload={reload}
                buttonClassMod='success'
                taskId={taskId}
                userId={userId}
                state='success'
              >
                Success
              </ChangeStateButton>
              <ChangeStateButton reload={reload} buttonClassMod='error' taskId={taskId} userId={userId} state='fail'>
                Fail
              </ChangeStateButton>
              <Button classMod='ghost' link={`/tasks/id${taskId}`}>
                Show in tasks
              </Button>
            </>
          )}
        </ButtonGroup>
      </CollapsibleCard.Body>
    </CollapsibleCard>
  );
}

MemberTaskCard.defaultProps = {
  assignedTo: [],
  members: [],
  state: null,
};

MemberTaskCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  edit: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  taskSet: PropTypes.oneOf(['all', 'user']).isRequired,
  role: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,

  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  state: PropTypes.string,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      memberTaskId: PropTypes.string,
    }),
  ),
  members: PropTypes.objectOf(
    PropTypes.shape({
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(MemberTaskCard, compareObjects);
