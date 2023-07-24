import {
  MAX_CAR_NAME_LENGTH,
  MIN_CAR_NAME_LENGTH,
  RACE_FORWARD_RANDOM_NUMBER_LIMIT,
} from "../constants/rules";

/**
 * 이름은 1~5자만 가능하다.
 * @param {string} name
 */
export const isValidateInputLength = name => {
  return (
    name !== undefined &&
    name.length >= MIN_CAR_NAME_LENGTH &&
    name.length <= MAX_CAR_NAME_LENGTH
  );
};

/**
 * 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
 * @param {number} min - minimum number
 * @param {number} max
 * @returns number
 */
export const getRandomNumber = (min, max) => {
  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomValue >= RACE_FORWARD_RANDOM_NUMBER_LIMIT;
};
