export default function calculateAge(birthDate) {
  return new Date().getFullYear() - birthDate.getFullYear();
}
