export const limitStrMaxMinLength = (str, min, max) => {
  var pattern = new RegExp(`^.{${min},${max}}$`);

  return pattern.test(str);
};
