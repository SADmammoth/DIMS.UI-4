import React from 'react';
import PropTypes from 'prop-types';

function CollapsableCardDescription(props) {
  const { children, cardClass } = props;
  return <div className={`${cardClass}-card__description`}>{children}</div>;
}

CollapsableCardDescription.propTypes = {
  cardClass: PropTypes.string.isRequired,
};

export default CollapsableCardDescription;
