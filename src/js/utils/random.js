export const getRandomNumber = ({ GENERATION_MIN: min, GENERATION_MAX: max }) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
