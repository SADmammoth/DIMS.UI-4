import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ContainerComponent from '../ContainerComponent';
import Nav from './Nav';
import TextBadge from '../TextBadge';
import SettingsButton from '../SettingsButton';
import MobileNav from './MobileNav';
import matchMaxWidth from '../../../helpers/matchMaxWidth';
import Form from '../Form';
import regexpEscape from '../../../helpers/Validator/regexpEscape';

function Header(props) {
  const { title, navItems, role, filterFunction } = props;
  const [filterRegexpMode, setFilterRegexpMode] = useState(false);

  return (
    <header className={`header fixed-top${filterFunction ? ' extended' : ''}`}>
      <ContainerComponent display='flex'>
        <p className='site-title'>
          <Link to='/'>DIMSUI</Link>
        </p>
        <div className='content'>
          <ContainerComponent display='flex'>
            {title && (
              <h1 className='page-title'>
                {title}
                {matchMaxWidth('600px') || (role && <TextBadge>{role}</TextBadge>)}
              </h1>
            )}
            <>
              {navItems && navItems.length && (
                <>
                  {matchMaxWidth('1200px') ? (
                    <MobileNav className='header__nav' navItems={navItems} />
                  ) : (
                    <Nav className='header__nav' navItems={navItems} />
                  )}
                </>
              )}
            </>
            {role && <SettingsButton />}
          </ContainerComponent>
          <div className='input-panel'>
            {filterFunction && (
              <Form
                inputs={[
                  {
                    id: 'search',
                    type: 'text',
                    name: 'filter',
                    placeholder: 'Search',
                    description: 'Search',
                    onInput: (name, input) => {
                      let filterString;
                      if (filterRegexpMode) {
                        try {
                          filterString = new RegExp(input, 'i');
                          console.log(new RegExp(input, 'i'));
                        } catch (err) {
                          filterFunction();
                        }

                        regexpEscape(input);
                      } else {
                        filterString = regexpEscape(input);
                      }
                      console.log(filterString);
                      filterFunction(filterString);
                    },
                  },
                  {
                    id: 'regexpMode',
                    type: 'checkbox',
                    name: 'regexpMode',
                    description: 'Regexp mode',
                    onChange: (name, input) => {
                      setFilterRegexpMode(input.includes('on'));
                      console.log(filterRegexpMode);
                    },
                    valueOptions: [{ label: 'Regexp mode', value: 'on' }],
                  },
                ]}
                submitButton={<></>}
                showNotifications='hideAll'
              />
            )}
          </div>
        </div>
      </ContainerComponent>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navItems: Nav.propTypes.navItems,
  role: PropTypes.string,
  filterFunction: PropTypes.func,
};

export default Header;
