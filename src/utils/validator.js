import { isAlphabet, toArray } from "../utils/string";
import { isDuplicated } from "../utils/array";
import { ERROR_CAR_NAME } from "../contants/messages";
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  SEPARATOR,
} from "../contants/racingGame";

export function validateNames(inputValue) {
  const names = toArray(inputValue, SEPARATOR);

  names.forEach((name) => {
    if (name.length > NAME_MAX_LENGTH) {
      throw new Error(ERROR_CAR_NAME.MAX_LENGTH(NAME_MAX_LENGTH));
    }

    if (name.length < NAME_MIN_LENGTH) {
      throw new Error(ERROR_CAR_NAME.MIN_LENGTH(NAME_MIN_LENGTH));
    }

    if (!isAlphabet(name)) {
      throw new Error(ERROR_CAR_NAME.PATTERN);
    }
  });

  if (isDuplicated(names)) {
    throw new Error(ERROR_CAR_NAME.UINIQUE);
  }
}
