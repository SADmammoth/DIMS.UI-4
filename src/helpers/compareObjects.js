export default function compareObjects(leftObject, rightObject) {
  return JSON.stringify(leftObject) === JSON.stringify(rightObject);
}
