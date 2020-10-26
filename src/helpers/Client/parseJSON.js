export default function parseJSON(response) {
  if (!response) {
    return {};
  }

  return response.data;
}
