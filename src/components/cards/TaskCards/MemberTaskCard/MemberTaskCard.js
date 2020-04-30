import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import DateBadge from '../../../elements/DateBadge';
import Button from '../../../elements/Button';
import { ReactComponent as TrackIcon } from '../../../../assets/icons/Track.svg';
import { TaskEditButton } from '../../../elements/TaskForms/TaskEdit';
import { TrackButton } from '../../../elements/TaskForms/TrackForm';
import ButtonGroup from '../../../elements/ButtonGroup/ButtonGroup';
import CollapsableCard from '../../CollapsableCard';
import { AssignButton } from '../../../elements/AssignForm';
import DialogButton from '../../../elements/DialogButton/DialogButton';
import compareObjects from '../../../../helpers/compareObjects';
import Client from '../../../../helpers/Client/Client';
import Validator from '../../../../helpers/Validator';
import checkboxValueSeparator from '../../../../helpers/checkboxValueSeparator';

function MemberTaskCard(props) {
  const {
    taskName,
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
  } = props;

  const assignedToIds = assignedTo.map((user) => user.userId);

  const editTask = async ({ taskName, taskDescription, taskStart, taskDeadline, members }) => {
    const assignedTo = checkboxValueSeparator(members);
    if (
      !compareObjects(
        assignedTo,
        assignedTo.map((el) => el.userId),
      )
    ) {
      await Client.assignTask(taskId, assignedTo);
    }
    return Client.editTask(
      taskId,
      taskName,
      taskDescription,
      Validator.dateByMask(taskStart, 'dd-MM-yyyy'),
      Validator.dateByMask(taskDeadline, 'dd-MM-yyyy'),
    );
  };

  return (
    <CollapsableCard
      id={id}
      cardClass='task'
      className={state ? `task-card_${state.toLowerCase()}` : null}
      collapsed={collapsed}
      open={open}
      close={close}
    >
      <CollapsableCard.Header>
        <CollapsableCard.Title>{taskName}</CollapsableCard.Title>
      </CollapsableCard.Header>
      {state && (
        <div className='state'>
          <span>{state}</span>
        </div>
      )}
      <CollapsableCard.Body>
        <div className='task-card__dates'>
          <DateBadge type={DateBadge.DateTypes.startDate} date={taskStart} />
          <DateBadge type={DateBadge.DateTypes.endDate} date={taskDeadline} />
        </div>

        <CollapsableCard.Description>{taskDescription}</CollapsableCard.Description>
        {role === 'admin' && taskSet === 'all' && (
          <>
            {assignedTo.length ? (
              <>
                <h3>Assigned to:</h3>
                <ul className='inline-list'>
                  {assignedTo.map((user) => (
                    <li>
                      <Link to={`/members/${user.userId}/tasks/${user.memberTaskId}`}>
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
            <TrackButton taskName={taskName} buttonClassMod='primary'>
              <TrackIcon className='icon-track' />
              <span>Track</span>
            </TrackButton>
          )}
          {(role === 'admin' || role === 'mentor') && taskSet === 'all' && (
            <AssignButton buttonClassMod='primary' taskId={taskId} assignedTo={assignedToIds} members={members}>
              <TrackIcon className='icon-tasks' />
              <span>Assign</span>
            </AssignButton>
          )}
          {(role === 'admin' || role === 'mentor') && (
            <>
              <DialogButton
                buttonClassMod='secondary'
                buttonContent='Delete'
                message={
                  <p>
                    Are you confident, you want to delete task <b>{taskName}</b>?
                  </p>
                }
                confirmButtonClassMod='error'
                confirmButtonContent='Delete'
                dialogValue={id}
                onSubmit={({ dialogValue }) => console.log(dialogValue)}
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
                onSubmit={editTask}
                buttonContent='Edit'
              />
            </>
          )}
          {(role === 'admin' || role === 'mentor') && taskSet === 'user' && (
            <Button classMod='ghost' link={`/tasks/${taskId}`}>
              Show in tasks
            </Button>
          )}
        </ButtonGroup>
      </CollapsableCard.Body>
    </CollapsableCard>
  );
}

MemberTaskCard.defaultProps = {
  assignedTo: [],
  members: [],
};

MemberTaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  taskSet: PropTypes.oneOf(['all', 'user']).isRequired,
  role: PropTypes.string.isRequired,
  assignedTo: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ),

  taskName: PropTypes.string.isRequired,
  taskDescription: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  taskStart: PropTypes.instanceOf(Date).isRequired,
  taskDeadline: PropTypes.instanceOf(Date).isRequired,
};

export default React.memo(
  connect((state) => {
    return {
      members: state.members,
    };
  })(MemberTaskCard),
  compareObjects,
);

// TODO add success/fail
