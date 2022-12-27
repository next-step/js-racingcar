import {CAR} from "../constants/constants.js";

export const Validator = {
  InValidCarNames: (name, maxLength) => {
    return (
      name.trim().length > maxLength ||
      name.trim().length === CAR.NUMBER_OF_ZERO ||
      !name
    );
  },
};

export const validateCarNames = (namesArr) => {
  const isCarValidationValid =
    namesArr
      .split(",")
      .filter((name) => Validator.InValidCarNames(name, CAR.NAME_MAX_LENGTH))
      .length === CAR.NUMBER_OF_ZERO;

  return isCarValidationValid;
};

export const validateAttempts = (attempts) => {
  if (attempts <= CAR.NUMBER_OF_ZERO) return false;
  if (!attempts) return false;
  return true;
};
