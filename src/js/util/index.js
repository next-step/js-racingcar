export const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getIsForward = (num) => {
  const forwardStandard = 3;
  return num > forwardStandard;
};
