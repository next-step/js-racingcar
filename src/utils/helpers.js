/**
 * @param {number} min - minimum number
 * @param {number} max
 * @returns number
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
