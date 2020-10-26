import Validator from '../../../../helpers/Validator';
import masks from '../../../../helpers/maskHelpers/masks';

export default function trackFormInputsAttributes({ trackNote, trackDate }) {
  return [
    {
      type: 'textarea',
      name: 'trackNote',
      label: 'Track note',
      minSymbols: 4,
      maxSymbols: 600,
      value: trackNote,
    },
    {
      type: 'text',
      name: 'trackDate',
      label: 'Track date',
      placeholder: 'dd-mm-yyyy',
      value: Validator.fromDateToMask(trackDate, masks.date),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, [masks.date]),
      validator: (input) => Validator.dateTime(input, [masks.date]),
      validationMessage: Validator.dateTimeMessage,
      required: true,
    },
  ];
}
