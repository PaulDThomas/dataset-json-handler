export const getDataFromUrl = (url: string) => {
  const _url = new URL(url);
  if (!_url) {
    return null;
  }
  return fetch(_url)
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error);
      return null;
    });
};
