import React from 'react';
import PropTypes from 'prop-types';

function CollapsableCardBody(props) {
  const { cardClass, children } = props;
  return (
    <div className={`${cardClass}-card__body`}>
      {React.Children.map(children, (child) => {
        if (!child) {
          return child;
        }
        return React.cloneElement(child, { cardClass });
      })}
    </div>
  );
}

CollapsableCardBody.propTypes = {
  cardClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsableCardBody;
