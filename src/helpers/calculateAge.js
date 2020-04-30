export default function calculateAge(birthDate) {
  const now = new Date();
  if (
    (now.getMonth() === birthDate.getMonth() && now.getDate() > birthDate.getDate()) ||
    now.getMonth() < birthDate.getMonth()
  ) {
    return new Date().getFullYear() - birthDate.getFullYear() - 1;
  }
  return new Date().getFullYear() - birthDate.getFullYear();
}
