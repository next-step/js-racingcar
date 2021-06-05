export const nameVaildator = (names) =>
  names.findIndex((name) => name.length > 5 || name.length === 0) !== -1;
