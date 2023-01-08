export const makeRandomNumber = (minValue = 0, maxValue = 9) => {
  return Math.floor(Math.random() * maxValue + minValue);
};
