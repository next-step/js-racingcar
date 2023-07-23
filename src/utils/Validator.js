import { MESSAGE, CAR } from '../constants';

const validateLength = (name, maxLength) => {
  if (name.length <= maxLength)
    throw new Error(MESSAGE.ERROR.LENGTH_OVERFLOW(CAR.MAX_NAME_LENGTH));
};

export const validateCarName = (name) => {
  validateLength(name, CAR.MAX_NAME_LENGTH);
};
