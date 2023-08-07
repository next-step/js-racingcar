export const getRandomInRange = (min = 0, max = 9) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};
