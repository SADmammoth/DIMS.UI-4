import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import MembersManagerPage from './pages/MembersManagerPage';
import MemberTasksPage from './pages/MemberTasksPage';
import MemberProgressPage from './pages/MemberProgressPage';
import Error404Page from './pages/Error404Page';
import MemberTracksPage from './pages/MemberTracksPage';
import NewMember from './pages/NewMember';
import ScrollToTop from './ScrollToTop';
import NewTask from './pages/NewTask';

function Routes(props) {
  const { role, userId } = props;
  console.log(userId);
  const renderMemberTasksPage = (props) => {
    const { match } = props;
    console.log(match.params.id, userId);
    return role === 'member' && match.params.id !== userId ? (
      <Redirect to='/404' />
    ) : (
      <MemberTasksPage taskSet='user' />
    );
  };

  const renderTracksPage = (props) => {
    const { match } = props;
    return match.params.id !== userId ? <Redirect to='/404' /> : <MemberTracksPage />;
  };

  /* TODO Leave one 404 route */
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path='/404'>
          <Error404Page />
        </Route>
        <Route exact path='/members/:id/tasks' render={renderMemberTasksPage} />
        <Route exact path='/members/:id/tasks/id:open?' render={renderMemberTasksPage} />
        {role === 'admin' && (
          <Route path='/members/new'>
            <NewMember />
          </Route>
        )}
        {(role === 'admin' || role === 'mentor') && (
          <>
            <Route exact path='/'>
              <Redirect to='/members' />
            </Route>
            <Route exact path='/members'>
              <MembersManagerPage />
            </Route>
            <Route exact path='/tasks/'>
              <MemberTasksPage />
            </Route>
            <Route exact path='/tasks/new'>
              <NewTask />
            </Route>
            <Route exact path='/tasks/id:open?'>
              <MemberTasksPage />
            </Route>
            <Route path='/tasks/id:open/edit'>
              <MemberTasksPage edit />
            </Route>
            <Route path='/members/:id/progress'>
              <MemberProgressPage />
            </Route>
          </>
        )}
        {role === 'member' && (
          <>
            <Route exact path='/'>
              <Redirect to={`/members/${userId}/tasks`} />
            </Route>
            <Route path='/members/:id/tracks' render={renderTracksPage} />
          </>
        )}
        <Route path='*'>
          <Redirect to='/404' />
        </Route>
      </Switch>
    </>
  );
}

Routes.propTypes = {
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Routes;
