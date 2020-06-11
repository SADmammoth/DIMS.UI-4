import React from 'react';
import MemberProgressCard from '../../components/cards/TaskCards/MemberProgressCard';

export default function WrappedMemberProgressCard({
  id,
  taskName,
  trackNote,
  trackDate,
  collapsed,
  open,
  close,
  memberTaskId,
  userId,
}) {
  return (
    <MemberProgressCard
      id={id}
      memberTaskId={memberTaskId}
      userId={userId}
      taskName={taskName}
      trackNote={trackNote}
      trackDate={trackDate}
      collapsed={collapsed}
      open={open}
      close={close}
    />
  );
}
