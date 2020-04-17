import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

import MemberEdit from '../components/elements/MemberInfo/MemberEdit';
import ContainerComponent from '../components/elements/ContainerComponent/ContainerComponent';
import UserContext from '../helpers/UserContext';
import Header from '../components/elements/Header/Header';
import getNavItems from '../helpers/getNavItems';
import Client from '../helpers/Client';
import Validator from '../helpers/Validator';
import Spinner from '../components/elements/Spinner/Spinner';

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

    return Client.postMember(
      firstName,
      lastName,
      email,
      direction,
      sex,
      education,
      Validator.dateByMask(birthDate, 'dd-MM-yyyy'),
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      Validator.dateByMask(startDate, 'dd-MM-yyyy'),
    )
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <>
        <Helmet>
          <title>New member</title>
        </Helmet>
        <UserContext>
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
        </UserContext>
        <ContainerComponent>
          {!this.state.loading ? <MemberEdit empty onSubmit={this.postMember} /> : <Spinner centered />}
        </ContainerComponent>
      </>
    );
  }
}
export default withRouter(NewMember);
