export const camelToSnakeCase = (str: string) =>
  str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1_").toLowerCase();