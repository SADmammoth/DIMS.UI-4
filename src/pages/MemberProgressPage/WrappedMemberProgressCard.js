import React from 'react';
import MemberProgressCard from '../../components/cards/TaskCards/MemberProgressCard';

export default function WrappedMemberProgressCard({ id, taskName, trackNote, trackDate, collapsed, open, close }) {
  return (
    <MemberProgressCard
      id={id}
      taskName={taskName}
      trackNote={trackNote}
      trackDate={trackDate}
      collapsed={collapsed}
      open={open}
      close={close}
    />
  );
}
