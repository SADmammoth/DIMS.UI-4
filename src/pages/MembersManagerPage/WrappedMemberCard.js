import React from 'react';
import UserContextConsumer from '../../helpers/components/UserContextConsumer';
import MemberCard from '../../components/cards/MemberCard';

export default function WrappedMemberCard({
  id,
  firstName,
  lastName,
  email,
  startDate,
  direction,
  mobilePhone,
  skype,
  address,
  sex,
  birthDate,
  education,
  universityAverageScore,
  mathScore,
  collapsed,
  open,
  close,
  reloadMembers,
}) {
  return (
    <UserContextConsumer>
      {({ role }) => {
        return (
          <MemberCard
            id={id}
            firstName={firstName}
            lastName={lastName}
            birthDate={birthDate}
            direction={direction}
            startDate={startDate}
            email={email}
            mobilePhone={mobilePhone}
            skype={skype}
            address={address}
            sex={sex}
            education={education}
            universityAverageScore={universityAverageScore}
            mathScore={mathScore}
            role={role}
            collapsed={collapsed}
            open={open}
            close={close}
          />
        );
      }}
    </UserContextConsumer>
  );
}
