import Validator from '../../../helpers/Validator';

export default function loginModalInputAttributes() {
  return [
    { type: 'text', name: 'userName', validator: Validator.userName },
    { type: 'text', name: 'password' /*validator: Validator.password*/ },
  ];
}
