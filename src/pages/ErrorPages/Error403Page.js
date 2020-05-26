import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import background from '../../assets/images/devinc403.gif';
import Button from '../../components/elements/Button';

const Error403Page = () => {
  return (
    <>
      <Helmet>
        <title>403</title>
      </Helmet>
      <div className='error-title'>
        <h1>Not authorized</h1>
        <Button classMod='primary' link='/'>
          Go home page
        </Button>
      </div>
      <img
        className='error-image'
        width='800'
        height='835'
        src={background}
        alt='403: not authorised'
        title='403: not authorised'
      />
    </>
  );
};

export default withRouter(Error403Page);
