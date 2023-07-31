import { isEmpty, isStringOverLength } from '../utils/common';
import { ERROR_MESSAGE } from './errorMessage';

export const validateOverStringLength = ({
  value,
  length,
  message = `${length}자리 이하만 입력 가능합니다`,
}) => {
  if (isEmpty(value) || isEmpty(length)) {
    throw new Error(ERROR_MESSAGE.EMPTY_ARGUMENT);
  }
  if (isStringOverLength(value, length)) {
    throw new Error(message);
  }
};

export const validateEmptyString = (value) => {
  if (isEmpty(value)) {
    throw new Error(ERROR_MESSAGE.EMPTY_ARGUMENT);
  }

  if (!value || !value.toString().trim().length) {
    throw new Error(ERROR_MESSAGE.EMPTY_STRING);
  }
};
