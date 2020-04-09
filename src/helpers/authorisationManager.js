import Client from './Client';

async function authorisationManager(login, password) {
  console.log(login, password);
  const authToken = localStorage.getItem('authToken');
  if (!authToken || !(await Client.checkToken(authToken))) {
    if (!login || !password) {
      return { status: 'fail' };
    }
    const { status, found, token } = await Client.signIn(login, password);
    console.log(token);
    if (status === 'fail' && found) {
      return { status, message: 'Incorrect password' };
    }
    if (status === 'fail' && !found) {
      return { status, message: 'Incorrect username' };
    }

    localStorage.setItem('authToken', token);
  }
  return { status: 'success', message: 'Login succesful' };
}

export default authorisationManager;
