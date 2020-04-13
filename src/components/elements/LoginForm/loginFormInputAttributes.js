import Validator from '../../../helpers/Validator';

export default function loginFormInputAttributes() {
  return [
    { type: 'text', name: 'userName' },
    { type: 'text', name: 'password' },
  ];
}
