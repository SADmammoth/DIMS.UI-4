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

function Routes(props) {
  const { role, userID } = props;

  const renderMemberTasksPage = (props) => {
    const { match } = props;
    return role === 'member' && match.params.id !== userID ? (
      <Redirect to='/404' />
    ) : (
      <MemberTasksPage taskSet='user' />
    );
  };

  const renderTracksPage = (props) => {
    const { match } = props;
    return match.params.id !== userID ? <Redirect to='/404' /> : <MemberTracksPage />;
  };

  /* TODO Leave one 404 route */
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path='/404'>
          <Error404Page />
        </Route>
        <Route exact path='/members/:id/tasks/:open?' render={renderMemberTasksPage} />
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
            <Route exact path='/tasks/:open?'>
              <MemberTasksPage />
            </Route>
            <Route path='/tasks/:open/edit'>
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
              <Redirect to={`/members/${userID}/tasks`} />
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
  userID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Routes;
