import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import store from '../redux';
import MemberEdit from '../components/elements/MemberInfo/MemberEdit';
import ContainerComponent from '../components/elements/ContainerComponent/ContainerComponent';
import UserContextConsumer from '../helpers/components/UserContextConsumer';
import Header from '../components/elements/Header/Header';
import getNavItems from '../helpers/getNavItems';
import Client from '../helpers/Client';
import Validator from '../helpers/Validator';
import Spinner from '../components/elements/Spinner/Spinner';
import { addMember } from '../redux/actions/membersActions';
import Footer from '../components/elements/Footer';
import masks from '../helpers/maskHelpers/masks';

const NewMember = (props) => {
  const [loading, setLoading] = useState(false);

  const postMember = ({
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
    setLoading(true);
    const calculatedStartDate = Validator.parseDateByMask(startDate, masks.date);
    const calculatedBirthDate = Validator.parseDateByMask(birthDate, masks.date);

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
        setLoading(false);
        return response;
      })
      .catch((response) => {
        setLoading(false);
        return response;
      });
  };

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
                props.match.path,
              )}
            />
          );
        }}
      </UserContextConsumer>
      <main>
        <ContainerComponent>
          {!loading ? <MemberEdit empty onSubmit={postMember} /> : <Spinner centered />}
        </ContainerComponent>
      </main>
      <Footer />
    </>
  );
};
export default withRouter(NewMember);
