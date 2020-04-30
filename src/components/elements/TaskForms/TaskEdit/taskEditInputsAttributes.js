import Validator from '../../../../helpers/Validator';

export default function taskEditInputsAttributes({
  taskName,
  taskDescription,
  taskStart,
  taskDeadline,
  assignedTo,
  members,
}) {
  console.log(taskDescription);

  return [
    {
      type: 'text',
      name: 'taskName',
      value: taskName,
    },
    {
      type: 'textarea',
      name: 'taskDescription',
      label: 'Task description',
      minSymbols: 4,
      maxSymbols: 600,
      value: taskDescription,
    },
    {
      type: 'text',
      name: 'taskStart',
      label: 'Task start',
      value: Validator.fromDateToMask(taskStart, 'dd-MM-yyyy'),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, ['dd-MM-yyyy']),
      validator: (input) => Validator.dateTime(input, ['dd-MM-yyyy']),
      validationMessage: Validator.dateTimeMessage,
    },
    {
      type: 'text',
      name: 'taskDeadline',
      label: 'Task deadline',
      value: Validator.fromDateToMask(taskDeadline, 'dd-MM-yyyy'),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, ['dd-MM-yyyy']),
      validator: (input) => Validator.dateTime(input, ['dd-MM-yyyy']),
      validationMessage: Validator.dateTimeMessage,
    },
    {
      type: 'checkbox',
      name: 'members',
      label: 'Assigned to members',
      value: assignedTo.map((member) => member.userId),
      valueOptions: Object.entries(members).map(([id, member]) => {
        return { label: `${member.firstName} ${member.lastName}`, value: id };
      }),
    },
  ];
}
