import { getRandomNumber } from '../utils/random.js';
import { NAME_LENGTH_MIN, NAME_LENGTH_MAX } from '../constant/racingcar.js';
import { catchMessage, getType } from '../validate/validate.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

const racingManager = {
  names: [],
  trialCount: 0,
  gameResult: [],

  trimNames(value) {
    return value.replace(/\s*,\s*/g, ',').trim();
  },

  splitName(name) {
    return name.split(',');
  },

  isGoOrStop(randomNum) {
    return randomNum > 3;
  },

  goCondition() {
    const randomNum = getRandomNumber(0, 9);
    return this.isGoOrStop(randomNum);
  },

  getGameResult() {
    return new Array(this.trialCount).fill(false).map(_ => this.goCondition());
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
    if (trialCount < 1) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
    if (getType(trialCount) !== 'Number') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    return true;
  }),

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
    console.log(this.gameResult);
    console.log(maxValue);

    const winners = Object.entries(this.gameResult).reduce((acc, [key, value]) => {
      if (value.filter(Boolean).length === maxValue) return [...acc, key];
      return acc;
    }, []);
    console.log(winners);

    return winners;
  },

  updateWinner() {},
};

export default racingManager;
