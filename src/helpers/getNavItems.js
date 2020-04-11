const NavItems = {
  admin: [
    { id: 'Members', content: 'Members', link: '/members' },
    { content: 'Tasks', link: '/tasks/:open?' },
    // TODO Create member
  ],
  mentor: [
    { id: 'Members', content: 'Members', link: '/members' },
    { content: 'Tasks', link: '/tasks/:open?' },
  ],
  member: [
    { id: 'Tasks', content: 'Tasks', link: '/members/:id/tasks/:open?' },
    { id: 'Tracks', content: 'Tracks', link: '/members/:id/tracks' },
  ],
};

export default function getNavItems({ role, userID }, currentRoute) {
  return NavItems[role].map((item) => {
    let itemCopy = { ...item };
    itemCopy.active = itemCopy.link === currentRoute;
    itemCopy.link = itemCopy.link.replace(':id', userID);
    itemCopy.link = itemCopy.link.replace(/\/:[^/]*/g, '');
    return itemCopy;
  });
}
