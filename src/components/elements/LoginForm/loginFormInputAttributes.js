export default function loginFormInputAttributes() {
  return [
    { type: 'text', name: 'userName', placeholder: 'Username', description: 'Username', required: true },
    { type: 'password', name: 'password', placeholder: 'Password', description: 'Password', required: true },
  ];
}
