import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import background from '../../assets/images/devinc404.gif';
import Button from '../../components/elements/Button';

const Error404Page = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className='error-title'>
        <h1>Page not found</h1>
        <Button classMod='primary' link='/'>
          Go home page
        </Button>
      </div>
      <img
        className='error-image'
        width='886'
        height='924'
        src={background}
        alt='404: not found'
        title='404: not found'
      />
    </>
  );
};

export default withRouter(Error404Page);
