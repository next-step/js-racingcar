import { MAX_CAR_NAME_LENGTH } from "../../constants/rules";

import {
  ERROR_MESSAGE,
  MAX_LENGTH_CAR_NAME,
  NUMBER_REQUIRED,
} from "../../constants/errorMessage";

import { isValidNumber, validateEmptyString } from "../../utils/validator";

export const validateNameList = (itemList, errorPrompt) => {
  itemList.forEach(name => {
    validateEmptyString(name, errorPrompt);
    validateMaxLength(name);
  });
};

export const validateMaxLength = name => {
  if (name.length > MAX_CAR_NAME_LENGTH) {
    throw Error(ERROR_MESSAGE[MAX_LENGTH_CAR_NAME]);
  }
};

export const validatePositiveNumber = num => {
  if (!isValidNumber(num) || isNaN(num)) {
    throw new Error(ERROR_MESSAGE[NUMBER_REQUIRED]);
  }

  if (num <= 0) {
    throw Error(ERROR_MESSAGE[NUMBER_REQUIRED]);
  }
};
