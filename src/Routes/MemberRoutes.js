import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Error404Page } from '../pages/ErrorPages';
import MemberTracksPage from '../pages/MemberTracksPage';
import MemberTasksPage from '../pages/MemberTasksPage/MemberTasksPage';

function MemberRoutes({ userId }) {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to={`/members/${userId}/tasks`} />
      </Route>
      <Route path={`/members/:id(${userId})/tracks`}>
        <MemberTracksPage />
      </Route>
      <Route exact path={`/members/:id(${userId})/tasks`}>
        <MemberTasksPage taskSet='user' />
      </Route>
      <Route exact path={`/members/:id(${userId})/tasks/id:open?`}>
        <MemberTasksPage taskSet='user' />
      </Route>
      <Route exact path='/404'>
        <Error404Page />
      </Route>
      <Route>
        <Redirect to='/404' />
      </Route>
    </Switch>
  );
}

MemberRoutes.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MemberRoutes;
