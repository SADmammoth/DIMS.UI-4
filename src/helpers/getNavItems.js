const NavItems = {
  admin: [
    { id: 'Members', content: 'Members', link: '/members' },
    { id: 'Tasks', content: 'Tasks', link: '/tasks/' },
    { id: 'New member', content: 'New member', link: '/members/new' },
    { id: 'New task', content: 'New task', link: '/tasks/new' },
  ],
  mentor: [
    { id: 'Members', content: 'Members', link: '/members' },
    { id: 'Tasks', content: 'Tasks', link: '/tasks/' },
    { id: 'New task', content: 'New task', link: '/tasks/new' },
  ],
  member: [
    { id: 'Tasks', content: 'Tasks', link: '/members/:id/tasks/id:open?' },
    { id: 'Tracks', content: 'Tracks', link: '/members/:id/tracks' },
  ],
};

export default function getNavItems({ role, userId }, currentRoute) {
  return NavItems[role].map((item) => {
    let itemCopy = { ...item };
    itemCopy.active = itemCopy.link === currentRoute;
    itemCopy.link = itemCopy.link.replace(':id', userId);
    itemCopy.link = itemCopy.link.replace(/\/[^/]*:[^/]*\?/g, '');
    return itemCopy;
  });
}
