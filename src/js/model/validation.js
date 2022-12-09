import {CAR} from "../constants/constants.js";

export const validateCarNames = (namesArr) => {
  const namesError = namesArr
    .split(",")
    .filter((name) => name.trim().length >= CAR.NAME_MAX_LENGTH).length;

  if (!namesArr) return false;
  if (namesError > 0) return false;

  return true;
};

export const validateAttempts = (attempts) => (attempts <= 0 ? false : true);
