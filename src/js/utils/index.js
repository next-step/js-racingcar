export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isNumber = (number) => {
  return !Number.isNaN(number) && typeof number === 'number';
};
