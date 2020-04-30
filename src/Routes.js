import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import MembersManagerPage from './pages/MembersManagerPage';
import MemberTasksPage from './pages/MemberTasksPage';
import MemberProgressPage from './pages/MemberProgressPage';
import Error404Page from './pages/Error404Page';
import MemberTracksPage from './pages/MemberTracksPage';
import NewMember from './pages/NewMember';
import NewTask from './pages/NewTask';

function Routes(props) {
  const { role, userId } = props;
  return (
    <Switch>
      <Route path='/404'>
        <Error404Page />
      </Route>
      <Route
        exact
        path='/members/:id/tasks/id:open?'
        render={(props) => {
          return role === 'member' && props.match.params.id !== userId ? (
            <Redirect to='/404' />
          ) : (
            <MemberTasksPage taskSet='user' />
          );
        }}
      />
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
          <Route exact path='/tasks/new'>
            <NewTask />
          </Route>
          <Route exact path='/tasks/'>
            <MemberTasksPage taskSet='all' />
          </Route>
          <Route exact path='/tasks/id:open?'>
            <MemberTasksPage taskSet='all' />
          </Route>
          <Route exact path='/tasks/id:open/edit'>
            <MemberTasksPage edit taskSet='all' />
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
          <Route
            path='/members/:id/tracks'
            render={(props) => {
              return props.match.params.id !== userId ? <Redirect to='/404' /> : <MemberTracksPage />;
            }}
          />
        </>
      )}
      <Route path='*'>
        <Redirect to='/404' />
      </Route>
    </Switch>
  );
}

Routes.propTypes = {
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default Routes;
