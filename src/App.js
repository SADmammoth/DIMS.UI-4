import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MembersManagerPage from './pages/MembersManagerPage';
import MemberTasksPage from './pages/MemberTasksPage';
import MemberProgressPage from './pages/MemberProgressPage';
import Error404Page from './pages/Error404Page';

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
          <Route path='/members/:id/tasks'>
            <MemberTasksPage />
          </Route>
          <Route path='/members/:id/progress'>
            <MemberProgressPage />
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
