import React from 'react';
import PropTypes from 'prop-types';
import ListPlaceholder from './ListPlaceholder';
import CollapsableItemsList from '../CollapsableItemsList';

function CollapsableItemsConditionalList(props) {
  const { itemsPluralName, open, items } = props;
  const itemsLength = items.length || Object.keys(items).length;
  return (
    <div>
      {itemsLength ? (
        <CollapsableItemsList open={open} items={items} />
      ) : (
        <ListPlaceholder>{`No ${itemsPluralName}`}</ListPlaceholder>
      )}
    </div>
  );
}

CollapsableItemsConditionalList.defaultProps = {
  itemsPluralName: 'items',
};

CollapsableItemsConditionalList.propTypes = {
  open: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  itemsPluralName: PropTypes.string,
};

export default CollapsableItemsConditionalList;
