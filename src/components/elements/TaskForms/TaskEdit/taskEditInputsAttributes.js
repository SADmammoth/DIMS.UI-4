import Validator from '../../../../helpers/Validator';

export default function taskEditInputsAttributes({ taskDescription, taskStart, taskDeadline, assignedTo, members }) {
  return [
    {
      type: 'textarea',
      name: 'taskDescription',
      label: 'Task description',
      minSymbols: 50,
      maxSymbols: 600,
      value: taskDescription,
    },
    {
      type: 'text',
      name: 'taskStart',
      label: 'Task start',
      value: `${taskStart.getMonth()}-${taskStart.getDate()}-${taskStart.getFullYear()}`,
      byCharValidator: Validator.dateByChar,
    },
    {
      type: 'text',
      name: 'taskDeadline',
      label: 'Task deadline',
      value: `${taskDeadline.getMonth()}-${taskDeadline.getDate()}-${taskDeadline.getFullYear()}`,
      byCharValidator: Validator.dateByChar,
    },
    {
      type: 'checkbox',
      name: 'members',
      label: 'Assigned to members',
      value: assignedTo.map((member) => `${member.firstName} ${member.lastName}`),
      valueOptions: members.map((member) => `${member.firstName} ${member.lastName}`),
    },
  ];
}
