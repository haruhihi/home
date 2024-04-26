export const isConfig = (key: string) => {
  return getConfig(key) === "1";
};

export const getConfig = (key: string) => {
  return process.env[key];
};
