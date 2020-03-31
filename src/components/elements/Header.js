import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className='fixed-top'>
      <Container fullwidth display='flex'>
        <p className='site-title'>
          <Link to='/'>DIMSUI</Link>
        </p>
        <div className='content'>{props.content || props.children}</div>
      </Container>
    </header>
  );
}
