import Validator from '../../../helpers/Validator';

export default function loginModalInputAttributes() {
  return [
    { type: 'text', name: 'username', validator: Validator.username },
    { type: 'text', name: 'password' /*validator: Validator.password*/ },
  ];
}
