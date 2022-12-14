import { NAME_LENGTH_MIN, NAME_LENGTH_MAX } from '../constant/racingcar.js';
import { catchMessage, getType } from '../validate/validate.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

const TRIM_BETWEEN_COMMA = /\s*,\s*/g;
const COMMA = ',';

const carName = {
  trimNames(value) {
    return value.replace(TRIM_BETWEEN_COMMA, COMMA).trim();
  },

  splitName(name) {
    return name.split(COMMA);
  },

  isInRange(names) {
    return names.every(name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX);
  },

  isUnique(inputNames) {
    return inputNames.length === new Set(inputNames).size;
  },

  isValidNames: catchMessage(inputNames => {
    if (!carName.isInRange(inputNames)) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    if (!carName.isUnique(inputNames)) throw new Error(ERROR_MESSAGES.DUPLICATED_NAME);
    if (getType(inputNames) !== 'Array') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    return true;
  }),
};

export default carName;
