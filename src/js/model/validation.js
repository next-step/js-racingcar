import {CAR} from "../constants/constants.js";

export const Validator = {
  isLength: (name, maxLength) => {
    return name.trim().length > maxLength || name.trim().length === 0;
  },
};

export const validateCarNames = (namesArr) => {
  const isCarValidationValid =
    namesArr
      .split(",")
      .filter((name) => Validator.isLength(name, CAR.NAME_MAX_LENGTH))
      .length === 0;

  return isCarValidationValid;
};

export const validateAttempts = (attempts) => (attempts <= 0 ? false : true);
