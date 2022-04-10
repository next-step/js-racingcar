import { CAR_NAME_LENGTH_LIMIT } from "./constant.js";

export const isAllCarNameValid = (carNames) => {
  const invalidNames = carNames.filter(
    (name) => name.length > CAR_NAME_LENGTH_LIMIT
  );
  return invalidNames.length === 0;
};
