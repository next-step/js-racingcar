export const getRandomIntInclusive = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getIsForward = (num) => {
  const FORWARD_STANDARD = 3;
  return num > FORWARD_STANDARD;
};
