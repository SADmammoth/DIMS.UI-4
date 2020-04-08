import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MembersManagerPage from './pages/MembersManagerPage';
import MemberTasksPage from './pages/MemberTasksPage';
import MemberProgressPage from './pages/MemberProgressPage';
import Error404Page from './pages/Error404Page';
import MemberTracksPage from './pages/MemberTracksPage';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/members' />
          </Route>
          <Route exact path='/members'>
            <MembersManagerPage />
          </Route>
          <Route exact path='/members/:id/tasks/:open?'>
            <MemberTasksPage taskSet='user' />
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
          <Route path='/members/:id/tracks'>
            <MemberTracksPage />
          </Route>
          <Route path='*'>
            <Error404Page />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
