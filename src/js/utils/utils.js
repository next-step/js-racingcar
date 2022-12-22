import { ERROR_MESSAGES } from "./constants.js";
import { ValidationError } from "./error.js";

export const removeWordSpacing = (word) => word.trim();
export const checkEmptyString = (string) => {
  if (removeWordSpacing(string) === "") {
    throw new ValidationError(ERROR_MESSAGES.NOT_ALLOW_EMPTY_VALUE);
  }
};

export const checkAllMaxLengthOfStringNode = (arr, maxLength) => {
  if (Array.isArray(arr) === false) {
    throw new TypeError(`${arr}가 배열이 아닙니다.`);
  }

  const isValid = arr.every((node) => node.length < maxLength);
  if (isValid === false) {
    throw new ValidationError(ERROR_MESSAGES.NOT_ALLOW_NAME_LENGTH);
  }
};

export const checkAllTypeOfStringNode = (arr, type) => {
  if (Array.isArray(arr) === false) {
    throw new TypeError(`${arr}가 배열이 아닙니다.`);
  }
  if (type === "language") {
    const isValid = arr.every((node) => /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/.test(node));
    if (isValid === false) {
      throw new ValidationError(ERROR_MESSAGES.NOT_ALLOW_NAME_TYPE);
    }
  }
};
