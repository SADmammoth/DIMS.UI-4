export default function assignModalInputsAttributes({ assignedTo, members }) {
  return [
    {
      type: 'checkbox',
      name: 'members',
      label: 'Assigned to members',
      value: assignedTo,
      valueOptions: Object.entries(members).map(([id, member]) => {
        return { label: `${member.firstName} ${member.lastName}`, value: id };
      }),
      defaultValue: assignedTo,
    },
  ];
}
