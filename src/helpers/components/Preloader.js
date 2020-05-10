import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Client from '../Client';
import store from '../../redux';
import * as membersActions from '../../redux/actions/membersActions';
import * as assignedTasksActions from '../../redux/actions/assignedTasksActions';
import preloadTheme from '../preloadTheme';
import getStateMembers from '../getStateMembers';

const Preloader = ({ children, members }) => {
  preloadTheme();
  useEffect(() => {
    async function fetchMembers() {
      const fetchedMembers = await Client.getMembers();
      store.dispatch(membersActions.setMembers(fetchedMembers));
    }

    fetchMembers();
  }, []);

  useEffect(() => {
    async function fetchAssignedTasks() {
      if (members && Object.keys(members).length) {
        const taskIds = Object.keys(await Client.getTasks());
        const assigned = {};

        await Promise.all(
          taskIds.map(async (taskId) => {
            console.log(members);
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
        store.dispatch(assignedTasksActions.setAssignedToTasks(assigned));
      }
    }

    fetchAssignedTasks();
  }, [members]);

  return <>{children}</>;
};

Preloader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  members: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(getStateMembers)(Preloader);
