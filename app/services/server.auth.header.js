export default function prepareHeader(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}
