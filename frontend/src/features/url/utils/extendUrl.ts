import checkProtocol from "./checkProtocol";

export default (url: string) => {
  if (checkProtocol(url)) {
    return url;
  }
  return `https://${url}`;
};
