import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContainerComponent from '../ContainerComponent';
import Nav from './Nav';
import TextBadge from '../TextBadge';
import SettingsButton from '../SettingsButton';
import MobileNav from './MobileNav';

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
                {window.matchMedia('(max-width: 600px)').matches || <TextBadge>{role}</TextBadge>}
              </h1>
            )}
            {!window.matchMedia('(max-width: 1000px)').matches ? (
              <>{navItems && navItems.length && <Nav className='header__nav' navItems={navItems} />}</>
            ) : (
              <>{navItems && navItems.length && <MobileNav className='header__nav' navItems={navItems} />}</>
            )}
            <SettingsButton />
          </ContainerComponent>
        </div>
      </ContainerComponent>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: Nav.propTypes.navItems,
  role: PropTypes.string.isRequired,
};

export default Header;
