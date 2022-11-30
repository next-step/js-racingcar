export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max - min) + min;
};

export const sortObjectByValue = (obj, option = 'asc') =>
  Object.entries(obj).sort(([, a], [, b]) => (option === 'asc' ? a - b : b - a));
