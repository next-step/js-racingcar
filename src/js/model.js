export const isValidation = (namesArr) => {
  const namesError = namesArr
    .split(",")
    .filter((name) => (name.trim().length >= 6).length);

  if (!namesArr) return false;
  if (namesError > 0) return false;

  return true;
};
