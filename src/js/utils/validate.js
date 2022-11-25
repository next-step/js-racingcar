import { ERROR_MESSAGES, NAME_LENGTH_MIN, NAME_LENGTH_MAX, TRIAL_COUNT_MIN } from './constants.js';

export const isValidNames = inputNames => {
  const isInRange = names =>
    names.every(name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX);

  try {
    if (isInRange(inputNames) === false) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
  } catch (error) {
    alert(error.message);
    return false;
  }
  return true;
};

export const isValidTrialCount = trialCount => {
  try {
    if (trialCount < TRIAL_COUNT_MIN) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
  } catch (error) {
    alert(error.message);
    return false;
  }
  return true;
};
