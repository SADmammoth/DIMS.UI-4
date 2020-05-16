import React from 'react';
import PropTypes from 'prop-types';
import ListPlaceholder from './ListPlaceholder';
import CollapsibleItemsList from '../CollapsibleItemsList';

function CollapsibleItemsConditionalList(props) {
  const { itemsPluralName, open, items } = props;
  const itemsLength = items.length || Object.keys(items).length;
  return (
    <div>
      {itemsLength ? (
        <CollapsibleItemsList open={open} items={items} />
      ) : (
        <ListPlaceholder>{`No ${itemsPluralName}`}</ListPlaceholder>
      )}
    </div>
  );
}

CollapsibleItemsConditionalList.defaultProps = {
  itemsPluralName: 'items',
};

CollapsibleItemsConditionalList.propTypes = {
  open: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  itemsPluralName: PropTypes.string,
};

export default CollapsibleItemsConditionalList;
