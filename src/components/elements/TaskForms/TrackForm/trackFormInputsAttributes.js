import Validator from '../../../../helpers/Validator';

export default function trackFormInputsAttributes({ trackNote, trackDate }) {
  return [
    {
      type: 'textarea',
      name: 'trackNote',
      label: 'Track note',
      minSymbols: 50,
      maxSymbols: 600,
      value: trackNote,
    },
    {
      type: 'text',
      name: 'trackDate',
      label: 'Track date',
      value: `${trackDate.getMonth()}-${trackDate.getDate()}-${trackDate.getFullYear()}`,
      byCharValidator: Validator.dateByChar,
    },
  ];
}
