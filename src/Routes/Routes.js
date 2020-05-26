import React from 'react';
import PropTypes from 'prop-types';

import MentorRoutes from './MentorRoutes';
import AdminRoutes from './AdminRoutes';
import MemberRoutes from './MemberRoutes';

function Routes(props) {
  const { role, userId } = props;

  return (
    <>
      {role === 'member' && <MemberRoutes userId={userId} />}

      {role === 'mentor' && <MentorRoutes userId={userId} />}

      {role === 'admin' && <AdminRoutes userId={userId} />}
    </>
  );
}

Routes.propTypes = {
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Routes;
