import {
  NAME_LENGTH_MIN,
  NAME_LENGTH_MAX,
  TRIAL_COUNT_MIN,
} from '../constant/racingcar.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

const isInRange = names =>
  names.every(name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX);

const isUnique = inputNames => inputNames.length === new Set(inputNames).size;

export const isValidNames = inputNames => {
  try {
    if (!isInRange(inputNames)) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    if (!isUnique(inputNames)) throw new Error(ERROR_MESSAGES.DUPLICATED_NAME);
  } catch (error) {
    return alert(error.message);
  }
  return true;
};

export const isValidTrialCount = trialCount => {
  try {
    if (trialCount < TRIAL_COUNT_MIN) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
  } catch (error) {
    return alert(error.message);
  }
  return true;
};
