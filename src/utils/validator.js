import {
  ERROR_MESSAGE,
  NO_DUPLICATE_NAME,
  NO_EMPTY_STRING,
} from "../constants/errorMessage";

export const validateDuplicationItemList = list => {
  const arr = [];

  list.forEach(item => {
    if (arr.includes(item)) {
      throw Error(ERROR_MESSAGE[NO_DUPLICATE_NAME]);
    } else {
      arr.push(item);
    }
  });
};

export const validateEmptyString = (name, errorPrompt = NO_EMPTY_STRING) => {
  if (!name) {
    throw Error(ERROR_MESSAGE[errorPrompt]);
  }
};

export const isValidNumber = num => typeof num === "number";
