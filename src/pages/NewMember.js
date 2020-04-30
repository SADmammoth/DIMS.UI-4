import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import store from '../redux';
import MemberEdit from '../components/elements/MemberInfo/MemberEdit';
import ContainerComponent from '../components/elements/ContainerComponent/ContainerComponent';
import UserContextConsumer from '../helpers/UserContextConsumer';
import Header from '../components/elements/Header/Header';
import getNavItems from '../helpers/getNavItems';
import Client from '../helpers/Client';
import Validator from '../helpers/Validator';
import Spinner from '../components/elements/Spinner/Spinner';
import { addMember } from '../redux/actions/membersActions';
import Footer from '../components/elements/Footer';

class NewMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  postMember = ({
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
  }) => {
    this.setState({ loading: true });
    const calculatedStartDate = Validator.dateByMask(startDate, 'dd-MM-yyyy');
    const calculatedBirthDate = Validator.dateByMask(birthDate, 'dd-MM-yyyy');

    store.dispatch(
      addMember({
        firstName,
        lastName,
        email,
        skype,
        mobilePhone,
        address,
        sex,
        calculatedStartDate,
        calculatedBirthDate,
        direction,
        education,
        universityAverageScore,
        mathScore,
      }),
    );

    return Client.postMember(
      firstName,
      lastName,
      email,
      direction,
      sex,
      education,
      calculatedBirthDate,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      calculatedStartDate,
    )
      .then((response) => {
        this.setState({ loading: false });
        return response;
      })
      .catch((response) => {
        this.setState({ loading: false });
        return response;
      });
  };

  render() {
    const { loading } = this.state;

    return (
      <>
        <Helmet>
          <title>New member</title>
        </Helmet>
        <UserContextConsumer>
          {({ role, userId }) => {
            return (
              <Header
                role={role}
                title='New member'
                navItems={getNavItems(
                  {
                    role,
                    userId,
                  },
                  this.props.match.path,
                )}
              />
            );
          }}
        </UserContextConsumer>
        <main>
          <ContainerComponent>
            {!loading ? <MemberEdit empty onSubmit={this.postMember} /> : <Spinner centered />}
          </ContainerComponent>
        </main>
        <Footer />
      </>
    );
  }
}
export default withRouter(NewMember);
