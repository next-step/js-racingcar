export const isValidationName = (name) => {
  if (name.split(",").every((item) => item.length > 6)) return false;
  if (name.split(",").length === 1) return false;
  return true;
};
