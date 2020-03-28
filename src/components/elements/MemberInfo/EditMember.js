import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Validator from '../../../helpers/Validator';
import Button from '../Button';
import Form from '../Form';
import { ReactComponent as FlagIcon } from '../../../assets/icons/flag.svg';
import { ReactComponent as SkypeIcon } from '../../../assets/icons/skype.svg';
import { ReactComponent as MobileIcon } from '../../../assets/icons/Mobile.svg';
import { ReactComponent as AddressIcon } from '../../../assets/icons/Address.svg';
import { ReactComponent as EnvelopeIcon } from '../../../assets/icons/Envelope.svg';

export default function EditMember(props) {
  const [inputs, setInputs] = useState({});
  const {
    id,
    firstName,
    lastName,
    email,
    startDate,
    direction,
    mobilePhone,
    skype,
    address,
    sex,
    birthDate,
    education,
    universityAverageScore,
    mathScore,
  } = props;
  return (
    <Form
      className='edit-member'
      inputs={[
        {
          type: 'text',
          name: 'firstName',
          description: 'First Name',
          value: firstName,
          byCharValidator: Validator.text,
        },
        { type: 'text', name: 'lastName', description: 'Last Name', value: lastName, byCharValidator: Validator.text },
        { type: 'text', name: 'email', description: 'Email', value: email, validator: Validator.email },
        { type: 'text', name: 'skype', description: 'Skype', value: skype, byCharValidator: Validator.username },
        {
          type: 'text',
          name: 'mobilePhone',
          description: 'Mobile phone',
          value: mobilePhone,
          byCharValidator: Validator.mobilePhoneByChar,
          validator: Validator.mobilePhone,
        },
        {
          type: 'text',
          name: 'address',
          description: 'Address',
          value: address,
          byCharValidator: Validator.alphanumeric,
        },
        {
          type: 'radio',
          name: 'sex',
          description: 'Sex',
          value: sex,
          valueOptions: ['Male', 'Female'],
        },
        {
          type: 'text',
          name: 'startDate',
          description: 'Start date',
          value: `${startDate.getMonth()}-${startDate.getDate()}-${startDate.getFullYear()}`,
          byCharValidator: Validator.dateByChar,
        },
        {
          type: 'text',
          name: 'birthDate',
          description: 'Birth date',
          value: `${birthDate.getMonth()}-${birthDate.getDate()}-${birthDate.getFullYear()}`,
          byCharValidator: Validator.dateByChar,
        },
        {
          type: 'select',
          name: 'direction',
          description: 'Direction',
          value: direction,
          valueOptions: ['Java', 'Salesforce', '.Net', 'Frontent'], //TODO Replace with request
        },
        {
          type: 'text',
          name: 'education',
          description: 'Education',
          value: education,
          byCharValidator: Validator.alphanumeric,
        },
        {
          type: 'text',
          name: 'universityAverageScore',
          description: 'University average score',
          value: universityAverageScore,
          byCharValidator: Validator.numeric,
          validator: (input) => Validator.float(input, 5, 10),
        },
        {
          type: 'text',
          name: 'mathScore',
          description: 'CT math score',
          value: mathScore,
          byCharValidator: Validator.numeric,
          validator: (input) => Validator.number(input, 20, 100),
        },
      ]}
      onInputsUpdate={setInputs}
      submitButton={<Button content='Confirm' classMod='secondary' />}
    >
      <div className='member-info__header'>
        <p className='member-info__title'>
          <b>{inputs.firstName}</b>
          {inputs.lastName}
        </p>
        <div className='date-badge'>
          <FlagIcon className='icon-flag common-text-color' />
          {inputs.startDate}
        </div>
        <div className='direction-badge'>{inputs.direction}</div>
      </div>
      <div className='member-info__body'>
        <div className='member-info__contacts'>
          <span>
            <EnvelopeIcon className='icon-envelope' />
            <span>{inputs.email}</span>
          </span>
          <span>
            <SkypeIcon className='icon-skype' />
            {inputs.skype}
          </span>
          <span>
            <MobileIcon className='icon-mobile' />
            <span>{inputs.mobilePhone}</span>
          </span>
        </div>
        <div>
          <p className='address'>
            <AddressIcon className='icon-address' />
            {inputs.address}
          </p>
          <hr />
        </div>
      </div>
      <div className='member-info__additional-info'>
        <div className='flex-column'>
          <div>
            <span className='list-key'>Sex:</span>
            <span>{inputs.sex}</span>
          </div>
          <div>
            <span className='list-key'>Birth date:</span>
            {inputs.birthDate}
          </div>
        </div>
        <div className='flex-column'>
          <div>
            <span className='list-key'>Education:</span>
            <span>{inputs.education}</span>
          </div>
          <div>
            <span className='list-key'>University average score:</span>
            <span>{inputs.universityAverageScore}</span>
          </div>
          <div>
            <span className='list-key'>CT math score:</span>
            <span>{inputs.mathScore}</span>
          </div>
        </div>
      </div>
      <Button content='Cancel' classMod='secondary' onClick={props.handleClose} />
    </Form>
  );
}
