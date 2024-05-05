export const serialize = (obj: any) => {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
};

export const excelIs = (text: unknown) => {
  return text === "1" || text === 1 || text === "是";
};
