import { NAME_CONFIGURE, ERROR_MESSAGE } from '../constants/index';

const validateType = (string) => typeof string === 'string';
const validateLength = (string) => {
  const { MAX_LENGTH, MIN_LENGTH } = NAME_CONFIGURE;
  return string.length >= MIN_LENGTH && string.length <= MAX_LENGTH;
};

const validateCarName = (name) => {
  const { CAR_NAME_NOT_STRING, CAR_NAME_INCORRECT_LENGTH } = ERROR_MESSAGE;
  if (!validateType(name)) {
    throw new Error(CAR_NAME_NOT_STRING);
  }

  if (!validateLength(name)) {
    throw new Error(CAR_NAME_INCORRECT_LENGTH);
  }
};

export default validateCarName;
