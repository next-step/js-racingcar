export const getRandomIntExclusive = (min, max) => {
  const minInt = Math.ceil(min) + 1;
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt) + minInt);
};
