import React from 'react';
import PropTypes from 'prop-types';

function ListPlaceholder(props) {
  const { children } = props;
  return <div className='list-placeholder'>{children}</div>;
}

ListPlaceholder.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default ListPlaceholder;
