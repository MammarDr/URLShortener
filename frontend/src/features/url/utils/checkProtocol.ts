export default (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};
