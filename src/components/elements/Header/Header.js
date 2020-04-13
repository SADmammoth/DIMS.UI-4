import React from 'react';
import { Link } from 'react-router-dom';

import ContainerComponent from '../ContainerComponent';

export default function Header(props) {
  return (
    <header className='fixed-top'>
      <ContainerComponent fullwidth display='flex'>
        <p className='site-title'>
          <Link to='/'>DIMSUI</Link>
        </p>
        <div className='content'>{props.content || props.children}</div>
      </ContainerComponent>
    </header>
  );
}
