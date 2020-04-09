import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import authorisationManager from './helpers/authorisationManager';
import Routes from './Routes';
import LoginModal from './components/elements/LoginModal/LoginModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authorised: null };
  }

  async componentDidMount() {
    this.setState({ authorised: (await authorisationManager()).status === 'success' });
  }
  logIn = async (login, password) => {
    this.setState({ authorised: (await authorisationManager(login, password)).status === 'success' });
  };

  render() {
    return (
      <Router>
        {this.state.authorised === null ? null : this.state.authorised ? (
          Routes()
        ) : (
          <LoginModal logIn={this.logIn} show />
        )}
      </Router>
    );
  }
}

export default App;
