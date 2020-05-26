import notify from './notify';

export default function errorNotification(description, message) {
  console.log(description, message);
  console.trace();
  notify('error', `${description} invalid input`, message);
}
