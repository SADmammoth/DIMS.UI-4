export default function filterMembers(memberData, filterString) {
  if (filterMembers) {
    return JSON.stringify(memberData).search(filterString) >= 0;
  }
  return true;
}
