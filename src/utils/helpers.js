import { ERROR_MESSAGE } from "../constants/ErrorMessage";

/**
 * @param {number} min - minimum number
 * @param {number} max
 * @returns number
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const validateDuplicationItemList = list => {
  const arr = [];

  list.forEach(item => {
    if (arr.includes(item)) {
      throw Error(ERROR_MESSAGE.duplicateCarName);
    } else {
      arr.push(item);
    }
  });
};

export const validateEmptyString = name => {
  if (!name) {
    throw Error(ERROR_MESSAGE.noEmptyName);
  }
};
