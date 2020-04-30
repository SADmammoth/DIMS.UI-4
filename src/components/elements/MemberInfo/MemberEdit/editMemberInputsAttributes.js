import Validator from '../../../../helpers/Validator';
import Client from '../../../../helpers/Client';

export default function editMemberInputsAttributes({
  firstName,
  lastName,
  email,
  skype,
  mobilePhone,
  address,
  sex,
  startDate,
  birthDate,
  direction,
  education,
  universityAverageScore,
  mathScore,
}) {
  return [
    {
      type: 'text',
      name: 'firstName',
      description: 'First Name',
      placeholder: 'First Name',
      value: firstName,
      byCharValidator: Validator.text,
      validator: Validator.text,
      validationMessage: 'First name may contain only letters',
    },
    {
      type: 'text',
      name: 'lastName',
      description: 'Last Name',
      placeholder: 'Last Name',
      value: lastName,
      byCharValidator: Validator.text,
      validationMessage: 'Last name may contain only letters',
    },
    {
      type: 'text',
      name: 'email',
      description: 'Email',
      placeholder: 'Email',
      value: email,
      validator: Validator.email,
      validationMessage: Validator.emailMessage,
    },
    {
      type: 'text',
      name: 'skype',
      description: 'Skype',
      placeholder: 'Skype',
      value: skype,
    },
    {
      type: 'text',
      name: 'mobilePhone',
      description: 'Mobile phone',
      placeholder: '+___ (___) ___-____',
      value: mobilePhone,
      mask: '+999 (999) 999-9999',
      validationMessage: Validator.mobilePhoneMessage,
    },
    {
      type: 'text',
      name: 'address',
      description: 'Address',
      placeholder: 'Address',
      value: address,
    },
    {
      type: 'radio',
      name: 'sex',
      description: 'Sex',
      value: sex,
      valueOptions: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ],
    },
    {
      type: 'text',
      name: 'startDate',
      description: 'Start date',
      placeholder: '##-##-####',
      value: startDate && Validator.fromDateToMask(startDate, 'dd-MM-yyyy'),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, ['dd-MM-yyyy']),
      validator: (input) => Validator.dateTime(input, ['dd-MM-yyyy']),
      validationMessage: Validator.dateTimeMessage,
    },
    {
      type: 'text',
      name: 'birthDate',
      description: 'Birth date',
      placeholder: '##-##-####',
      value: birthDate && Validator.fromDateToMask(birthDate, 'dd-MM-yyyy'),
      mask: '99-99-9999',
      maskType: 'invisible',
      byCharValidator: (input) => Validator.dateByChar(input, ['dd-MM-yyyy']),
      validator: (input) => Validator.dateTime(input, ['dd-MM-yyyy']),
      validationMessage: Validator.dateTimeMessage,
    },
    {
      type: 'select',
      name: 'direction',
      description: 'Direction',
      placeholder: 'Direction',
      value: direction,
      valueOptions: Client.directions.map((direction) => {
        return { label: direction, value: direction };
      }),
    },
    {
      type: 'text',
      name: 'education',
      description: 'Education',
      placeholder: 'Education',
      value: education,
    },
    {
      type: 'text',
      name: 'universityAverageScore',
      description: 'University average score',
      placeholder: '0.00',
      value: universityAverageScore,
      byCharValidator: Validator.numericByChar,
      validator: (input) => Validator.float(input, 5, 10),
      validationMessage: 'University average score must be real number from 5 to 10',
    },
    {
      type: 'text',
      name: 'mathScore',
      description: 'CT math score',
      placeholder: '000',
      value: mathScore,
      byCharValidator: Validator.numericByChar,
      validator: (input) => Validator.number(input, 20, 100),
      validationMessage: 'CT math score must be integer number from 20 to 100',
    },
  ];
}
