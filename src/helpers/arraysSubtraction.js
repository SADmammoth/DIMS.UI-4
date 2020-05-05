export default function arraysSubtraction(leftArray, rightArray) {
  return leftArray.filter((arrayItem) => {
    return rightArray.indexOf(arrayItem) < 0;
  });
}
