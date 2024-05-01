export const limitStrMaxMinLength = (str, min, max) => {
  const pattern = new RegExp(`^.{${min},${max}}$`);

  return pattern.test(str);
};
