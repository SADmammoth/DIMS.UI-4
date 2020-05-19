import calculateAge from './calculateAge';

export default function filterMembers(memberData, filterString) {
  if (filterMembers) {
    const age = calculateAge(memberData.birthDate);
    return (Object.values(memberData).join(' ') + age).search('\\b' + filterString + '\\b') >= 0;
  }
  return false;
}
