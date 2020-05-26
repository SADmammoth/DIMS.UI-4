import React from 'react';
import PropTypes from 'prop-types';

import CollapsedCard from './CollapsedCard';
import CollapsibleCardBody from './CollapsibleCardBody';
import CollapsibleCardTitle from './CollapsibleCardTitle';
import CollapsibleCardDescription from './CollapsibleCardDescription';

class CollapsibleCard extends React.PureComponent {
  static Header = CollapsedCard;

  static Body = CollapsibleCardBody;

  static Title = CollapsibleCardTitle;

  static Description = CollapsibleCardDescription;

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
            return child.type === CollapsibleCard.Header
              ? React.cloneElement(child, { onClick, collapsed, cardClass })
              : null;
          })}
          {!collapsed &&
            React.Children.map(children, (child) => {
              if (!child) {
                return child;
              }
              if (child.type === CollapsibleCard.Body || child.type === CollapsibleCard.Description) {
                return React.cloneElement(child, { cardClass });
              }
              if (child.type === CollapsibleCard.Header) {
                return null;
              }
              return child;
            })}
        </article>
      </>
    );
  }
}

CollapsibleCard.defaultProps = {
  cardClass: 'card',
  className: 'card',
};

CollapsibleCard.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  cardClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default CollapsibleCard;
