import { getRandomNumber } from '../utils/random.js';
import {
  TRIM_BETWEEN_COMMA,
  GENERATION_MIN,
  GENERATION_MAX,
  GO_OR_STOP_CONDITION,
  SEPARATOR,
  NAME_LENGTH_MIN,
  NAME_LENGTH_MAX,
  TRIAL_COUNT_MIN,
} from '../constant/racingcar.js';
import { catchMessage } from '../validate/validate.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

const racingManager = {
  names: [],
  trialCount: 0,
  gameResult: [],

  trimNames(value) {
    return value.replace(TRIM_BETWEEN_COMMA, SEPARATOR).trim();
  },

  splitName(name) {
    return name.split(SEPARATOR);
  },

  isGoOrStop(randomNum) {
    return randomNum > GO_OR_STOP_CONDITION;
  },

  getGameResult() {
    return new Array(this.trialCount).fill(false).map(_ => {
      const randomNum = getRandomNumber(GENERATION_MIN, GENERATION_MAX);
      return this.isGoOrStop(randomNum);
    });
  },

  isInRange(names) {
    return names.every(name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX);
  },

  isUnique(inputNames) {
    return inputNames.length === new Set(inputNames).size;
  },

  isValidNames: catchMessage(inputNames => {
    if (!racingManager.isInRange(inputNames)) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    if (!racingManager.isUnique(inputNames)) throw new Error(ERROR_MESSAGES.DUPLICATED_NAME);
    return true;
  }),

  isValidTrialCount: catchMessage(trialCount => {
    if (trialCount < TRIAL_COUNT_MIN) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
    return true;
  }),

  generateGame() {
    return this.names.reduce((acc, name) => ({ ...acc, [name]: this.getGameResult() }), {});
  },
};

export default racingManager;
