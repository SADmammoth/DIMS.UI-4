import React from 'react';
import { Redirect } from 'react-router-dom';
import MemberTasksPage from '../pages/MemberTasksPage';

const renderMemberTasksPage = ({ match }, role, userId) => {
  return role === 'member' && match.params.id !== userId ? <Redirect to='/404' /> : <MemberTasksPage taskSet='user' />;
};

export default renderMemberTasksPage;
