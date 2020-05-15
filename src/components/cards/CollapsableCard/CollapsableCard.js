import React from 'react';
import PropTypes from 'prop-types';

import CollapsedCard from './CollapsedCard';
import CollapsableCardBody from './CollapsableCardBody';
import CollapsableCardTitle from './CollapsableCardTitle';
import CollapsableCardDescription from './CollapsableCardDescription';

class CollapsableCard extends React.PureComponent {
  static Header = CollapsedCard;

  static Body = CollapsableCardBody;

  static Title = CollapsableCardTitle;

  static Description = CollapsableCardDescription;

  render() {
    const { id, collapsed, open, close, cardClass, children, className } = this.props;

    const onClick = (isCollapsed) => {
      return isCollapsed ? open(id) : close(id);
    };

    return (
      <>
        <article id={id} className={`card ${className || ''} ${cardClass}-card${!collapsed ? ' open' : ''}`}>
          {React.Children.map(children, (child) => {
            if (!child) {
              return child;
            }
            return child.type === CollapsableCard.Header
              ? React.cloneElement(child, { onClick, collapsed, cardClass })
              : null;
          })}
          {!collapsed &&
            React.Children.map(children, (child) => {
              if (!child) {
                return child;
              }
              if (child.type === CollapsableCard.Body || child.type === CollapsableCard.Description) {
                return React.cloneElement(child, { cardClass });
              }
              if (child.type === CollapsableCard.Header) {
                return null;
              }
              return child;
            })}
        </article>
      </>
    );
  }
}

CollapsableCard.defaultProps = {
  cardClass: 'card',
  className: 'card',
};

CollapsableCard.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  cardClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsableCard;
