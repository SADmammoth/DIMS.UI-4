import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContainerComponent from '../ContainerComponent';
import Nav from './Nav';
import DirectionBadge from '../DirectionBadge';

function Header(props) {
  const { title, navItems, role } = props;
  return (
    <header className='header fixed-top'>
      <ContainerComponent display='flex'>
        <p className='site-title'>
          <Link to='/'>DIMSUI</Link>
        </p>
        <div className='content'>
          <ContainerComponent display='flex'>
            {title && (
              <h1 className='page-title'>
                {title}
                <DirectionBadge direction={role} />
              </h1>
            )}

            {navItems && navItems.length && <Nav className='header__nav' navItems={navItems} />}
          </ContainerComponent>
        </div>
      </ContainerComponent>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  navItems: Nav.propTypes.navItems,
};

export default Header;
