import { MAX_CAR_NAME_LENGTH } from "../constants/rules";
import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { validateEmptyString } from "../validator";

export const validateNameList = itemList => {
  itemList.forEach(name => {
    validateEmptyString(name);
    validateMaxLength(name);
  });
};

export const validateMaxLength = name => {
  if (name.length > MAX_CAR_NAME_LENGTH) {
    throw Error(ERROR_MESSAGE.maxCarNameLength);
  }
};
