import { ERROR_MESSAGE } from "./constants/ErrorMessage";

export const validateDuplicationItemList = list => {
  const arr = [];

  list.forEach(item => {
    if (arr.includes(item)) {
      throw Error(ERROR_MESSAGE.duplicateName);
    } else {
      arr.push(item);
    }
  });
};

export const validateEmptyString = name => {
  if (!name) {
    throw Error(ERROR_MESSAGE.noEmptyName);
  }
};
