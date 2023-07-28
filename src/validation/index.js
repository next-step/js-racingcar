import { isStringOverLength } from '../utils/common';
import { ERROR_MESSAGE } from './errorMessage';

export const checkOverStringLength = ({
  value,
  length,
  message = `${length}자리 이하만 입력 가능합니다`,
}) => {
  if (isStringOverLength(value, length)) {
    throw new Error(message);
  }
};

export const checkEmptyString = (value) => {
  if (!value.toString().trim().length) {
    throw new Error(ERROR_MESSAGE.EMPTY_STRING);
  }
};
