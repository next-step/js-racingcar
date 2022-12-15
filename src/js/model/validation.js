import {CAR} from "../constants/constants.js";

export const Validator = {
  isLengthOver: (name, maxLength) => {
    return name.trim().length > maxLength;
  },
};

export const validateCarNames = (namesArr) => {
  const isCarValidationValid =
    namesArr
      .split(",")
      .filter((name) => Validator.isLengthOver(name, CAR.NAME_MAX_LENGTH))
      .length === 0;

  return isCarValidationValid;
};

export const validateAttempts = (attempts) => (attempts <= 0 ? false : true);
