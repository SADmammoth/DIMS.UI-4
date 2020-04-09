import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MembersManagerPage from './pages/MembersManagerPage';
import MemberTasksPage from './pages/MemberTasksPage';
import MemberProgressPage from './pages/MemberProgressPage';
import Error404Page from './pages/Error404Page';
import MemberTracksPage from './pages/MemberTracksPage';
import UserContext from './helpers/UserContext';

export default function Routes() {
  return (
    <UserContext.Consumer>
      {({ role, userID }) => {
        return (
          <Switch>
            <Route path='/404'>
              <Error404Page />
            </Route>
            {(role === 'admin' || role === 'mentor') && (
              <>
                <Route exact path='/'>
                  <Redirect to='/members' />
                </Route>
                <Route exact path='/members'>
                  <MembersManagerPage />
                </Route>
                <Route exact path='/tasks/:open?'>
                  <MemberTasksPage taskSet='all' />
                </Route>
                <Route path='/tasks/:open/edit'>
                  <MemberTasksPage edit taskSet='all' />
                </Route>
                <Route path='/members/:id/progress'>
                  <MemberProgressPage />
                </Route>
              </>
            )}
            <Route
              exact
              path='/members/:id/tasks/:open?'
              render={(props) => {
                return role === 'member' && props.match.params.id !== userID ? (
                  <Redirect to='/404' />
                ) : (
                  <MemberTasksPage taskSet='user' />
                );
              }}
            />
            {role === 'member' && (
              <>
                <Route exact path='/'>
                  <Redirect to={`/members/${userID}/tasks`} />
                </Route>
                <Route
                  path='/members/:id/tracks'
                  render={(props) => {
                    return props.match.params.id !== userID ? <Redirect to='/404' /> : <MemberTracksPage />;
                  }}
                />
              </>
            )}
            <Route path='*'>
              <Redirect to='/404' />
            </Route>
          </Switch>
        );
      }}
    </UserContext.Consumer>
  );
}
