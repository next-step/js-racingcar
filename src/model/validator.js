import { MAX_CAR_NAME_LENGTH, MIN_CAR_NAME_LENGTH } from "../constants/rules";

/**
 * 이름은 1~5자만 가능하다.
 * @param {string} name
 */
export const isValidInputLength = name => {
  return (
    name &&
    name.length >= MIN_CAR_NAME_LENGTH &&
    name.length <= MAX_CAR_NAME_LENGTH
  );
};
