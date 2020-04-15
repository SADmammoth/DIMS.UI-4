import React from 'react';
import PropTypes from 'prop-types';

function CollapsableCardBody(props) {
  const { cardClass, children } = props;
  return (
    <div className={`${cardClass}-card__body`}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { cardClass });
      })}
    </div>
  );
}

CollapsableCardBody.propTypes = {
  cardClass: PropTypes.string.isRequired,
};

export default CollapsableCardBody;
