export const getRandomInRange = (min = 0, max = 10) => {
  return min + Math.floor(Math.random() * (max - min));
};
