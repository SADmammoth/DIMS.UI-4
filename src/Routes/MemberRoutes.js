import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import renderTracksPage from './renderTracksPage';
import renderMemberTasksPage from './renderMemberTasksPage';
import Error404Page from '../pages/Error404Page';

function MemberRoutes({ userId }) {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to={`/members/${userId}/tasks`} />
      </Route>
      <Route
        path='/members/:id/tracks'
        render={(props) => {
          return renderTracksPage(props, userId);
        }}
      />
      <Route
        exact
        path='/members/:id/tasks'
        render={(props) => {
          return renderMemberTasksPage(props, 'member', userId);
        }}
      />
      <Route
        exact
        path='/members/:id/tasks/id:open?'
        render={(props) => {
          return renderMemberTasksPage(props, 'member', userId);
        }}
      />

      <Route exact path='/404'>
        <Error404Page />
      </Route>

      <Route path='*'>
        <Redirect to='/404' />
      </Route>
    </Switch>
  );
}

MemberRoutes.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MemberRoutes;
