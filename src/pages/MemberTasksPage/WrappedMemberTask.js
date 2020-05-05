import React from 'react';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import MemberTaskCard from '../../components/cards/TaskCards/MemberTaskCard';

export default function wrappedMemberTask({ collapsed, id, taskSet, edit, open, close, update, ...data }) {
  const { taskId, taskName, taskDescription, state, taskStart, taskDeadline, assignedTo } = data;
  return (
    <UserContextConsumer>
      {({ role }) => {
        return (
          <MemberTaskCard
            id={id}
            edit={edit}
            taskId={taskId}
            taskName={taskName}
            taskDescription={taskDescription}
            state={state}
            taskStart={taskStart}
            taskDeadline={taskDeadline}
            taskSet={taskSet}
            role={role}
            open={open}
            close={close}
            collapsed={collapsed}
            assignedTo={assignedTo}
            reload={update}
          />
        );
      }}
    </UserContextConsumer>
  );
}
