export default function removeArrayItems(
  array,
  itemsArray,
  comparator = (arrayItem, itemsArrayItem) => {
    return arrayItem === itemsArrayItem;
  },
) {
  const unfilteredArray = array.map((arrayItem) => {
    if (
      itemsArray.findIndex((itemsArrayItem) => {
        return comparator(arrayItem, itemsArrayItem);
      }) >= 0
    ) {
      return null;
    }
    return arrayItem;
  });
  return unfilteredArray.filter((element) => !!element);
}
