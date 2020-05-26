import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

import Client from '../Client';
import store from '../../redux';
import * as membersActions from '../../redux/actions/membersActions';
import * as assignedTasksActions from '../../redux/actions/assignedTasksActions';
import preloadTheme from '../preloadTheme';
import getStateMembers from '../getStateMembers';

const Preloader = ({ children, members }) => {
  const dispatch = useDispatch();
  preloadTheme();
  useEffect(() => {
    async function fetchMembers() {
      const fetchedMembers = await Client.getMembers();
      dispatch(membersActions.setMembers(fetchedMembers));
    }

    fetchMembers();
  }, [dispatch]);

  useEffect(() => {
    async function fetchAssignedTasks() {
      if (members && Object.keys(members).length) {
        const taskIds = Object.keys(await Client.getTasks());
        const assigned = {};

        await Promise.all(
          taskIds.map(async (taskId) => {
            const userIds = (await Client.getAssigned(members, taskId)).map(({ userId }) => {
              return userId;
            });
            const assignedArray = (await Client.getUsersMemberTasks(taskId, userIds)).map(
              ({ userId, memberTaskId }) => {
                return { userId, memberTaskId };
              },
            );

            assigned[taskId] = assignedArray;
          }),
        );
        dispatch(assignedTasksActions.setAssignedToTasks(assigned));
      }
    }

    fetchAssignedTasks();
  }, [members, dispatch]);

  return <>{children}</>;
};

Preloader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  members: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(getStateMembers)(Preloader);
