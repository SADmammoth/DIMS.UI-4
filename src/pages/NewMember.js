import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import MemberEdit from '../components/elements/MemberInfo/MemberEdit';
import ContainerComponent from '../components/elements/ContainerComponent/ContainerComponent';
import UserContextConsumer from '../helpers/UserContextConsumer';
import Header from '../components/elements/Header/Header';
import getNavItems from '../helpers/getNavItems';
import Footer from '../components/elements/Footer';

function NewMember(props) {
  return (
    <>
      <Helmet>
        <title>New member</title>
      </Helmet>
      <UserContextConsumer>
        {({ role, userID }) => {
          return <Header role={role} title='New member' navItems={getNavItems({ role, userID }, props.match.path)} />;
        }}
      </UserContextConsumer>
      <main>
        <ContainerComponent>
          <MemberEdit empty />
        </ContainerComponent>
      </main>
      <Footer />
    </>
  );
}
export default withRouter(NewMember);
