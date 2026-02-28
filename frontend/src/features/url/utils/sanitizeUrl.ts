export const sanitizeUrl = (url: string) => {
  const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, "").trim();
  return cleanUrl;
};
