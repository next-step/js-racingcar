import { getRandomNumber } from '../utils/random.js';
import { NAME_LENGTH_MIN, NAME_LENGTH_MAX } from '../constant/racingcar.js';
import { catchMessage, getType } from '../validate/validate.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

const TRIM_BETWEEN_COMMA = /\s*,\s*/g;
const COMMA = ',';
const TRIAL_COUNT_MIN = 1;
const GENERATION_MIN = 0;
const GENERATION_MAX = 9;
const GO_OR_STOP_CONDITION = 3;

const racingManager = {
  names: [],
  trialCount: 0,
  gameResult: [],

  resetAll() {
    this.names = [];
    this.trialCount = 0;
    this.gameResult = [];
  },

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
    if (!racingManager.isInRange(inputNames)) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    if (!racingManager.isUnique(inputNames)) throw new Error(ERROR_MESSAGES.DUPLICATED_NAME);
    if (getType(inputNames) !== 'Array') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    return true;
  }),

  isValidTrialCount: catchMessage(trialCount => {
    if (trialCount < TRIAL_COUNT_MIN) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
    if (getType(trialCount) !== 'Number') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    return true;
  }),

  gameStrategy: {
    getRandomNumber,
    isGoOrStop: randomNum => randomNum > GO_OR_STOP_CONDITION,
  },

  goConditions(condition, param = null) {
    return this.gameStrategy[condition](param);
  },

  getGameResult() {
    return new Array(this.trialCount).fill(false).map(_ => {
      const randomNumber = this.goConditions('getRandomNumber', { GENERATION_MIN, GENERATION_MAX });
      return this.goConditions('isGoOrStop', randomNumber);
    });
  },

  generateGame() {
    return this.names.reduce((acc, name) => ({ ...acc, [name]: this.getGameResult() }), {});
  },

  getMaxWinnerCount() {
    return Math.max(
      ...Object.entries(this.gameResult).map(([_, value]) => value.filter(Boolean).length),
    );
  },

  getWinner() {
    const maxValue = this.getMaxWinnerCount();

    return Object.entries(this.gameResult).reduce((acc, [key, value]) => {
      if (value.filter(Boolean).length === maxValue) return [...acc, key];
      return acc;
    }, []);
  },
};

export default racingManager;
