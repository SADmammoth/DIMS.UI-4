import React from 'react';
import PropTypes from 'prop-types';

import MentorRoutes from './MentorRoutes';
import AdminRoutes from './AdminRoutes';
import MemberRoutes from './MemberRoutes';
import GuestRoutes from './GuestRoutes';

function Routes(props) {
  const { role, userId } = props;

  return (
    <>
      {role === 'mentor' && <MentorRoutes userId={userId} />}

      {role === 'admin' && <AdminRoutes userId={userId} />}

      {role === 'member' && <MemberRoutes userId={userId} />}
    </>
  );
}

Routes.propTypes = {
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Routes;
