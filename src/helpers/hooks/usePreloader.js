import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import preloadTheme from '../preloadTheme';
import requestAndFetch from '../../redux/middleware/requestAndFetch';
import * as membersActions from '../../redux/actions/membersActions';
import * as assignedTasksActions from '../../redux/actions/assignedTasksActions';
import Client from '../Client';

const usePreloader = ({ members, role }) => {
  const dispatch = useDispatch();
  preloadTheme();

  useEffect(() => {
    if (!Object.keys(members).length && role !== 'member' && role !== 'guest') {
      (async () => {
        await Client.getDirections();
        await requestAndFetch(dispatch, membersActions.setMembers, Client.getMembers);
        await requestAndFetch(dispatch, assignedTasksActions.setAssignedToTasks, Client.getAllAssigned);
      })();
    }
  }, [role, members, dispatch]);

  return null;
};

export default usePreloader;
