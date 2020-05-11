import React from 'react';
import MemberProgressCard from '../../components/cards/TaskCards/MemberProgressCard';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';

export default function WrappedMemberProgressCard({
  id,
  memberTaskId,
  taskName,
  trackNote,
  trackDate,
  collapsed,
  open,
  close,
}) {
  return (
    <UserContextConsumer>
      {({ userId, role }) => {
        return (
          <MemberProgressCard
            id={id}
            userId={userId}
            memberTaskId={memberTaskId}
            taskName={taskName}
            trackNote={trackNote}
            trackDate={trackDate}
            collapsed={collapsed}
            open={open}
            close={close}
            role={role}
          />
        );
      }}
    </UserContextConsumer>
  );
}
