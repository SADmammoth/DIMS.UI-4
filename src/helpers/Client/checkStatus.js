import notify from '../formHelpers/notify';

export default function checkStatus({ response }) {
  if (response.data) {
    notify('error', 'Server error', response.data);
    return response;
  } else {
    throw new Error(`Status code ${response.status}: ${response.statusText}`);
  }
}
