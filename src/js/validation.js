import { CAR_NAME_LENGTH_LIMIT } from "./constant.js";

export const isAllCarNameValid = (carNames) => {
  const result = carNames.every(
    (value) => value.length <= CAR_NAME_LENGTH_LIMIT
  );
  return result;
};
