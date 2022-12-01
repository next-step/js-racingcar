import { getRandomNumber } from '../service/racingCar.js';
import {
  TRIM_BETWEEN_COMMA,
  GENERATION_MIN,
  GENERATION_MAX,
  GO_OR_STOP_CONDITION,
} from '../utils/constants.js';

const racingManager = {
  names: [],
  trialCount: 0,
  gameResult: [],

  setName(newName) {
    this.names = newName;
  },

  setTrialCount(newTrialCount) {
    this.trialCount = newTrialCount;
  },

  setGameResult(newGameResult) {
    this.gameResult = newGameResult;
  },

  trimNames(value) {
    return value.replace(TRIM_BETWEEN_COMMA, ',').trim();
  },

  splitName(name) {
    return name.split(',');
  },

  isGoOrStop(randomNum) {
    return randomNum > GO_OR_STOP_CONDITION;
  },

  getGameResult() {
    return new Array(this.trialCount).fill(false).map(element => {
      const randomNum = getRandomNumber(GENERATION_MIN, GENERATION_MAX);
      return this.isGoOrStop(randomNum);
    });
  },

  generateGame() {
    return this.names.reduce((acc, name) => ({ ...acc, [name]: this.getGameResult() }), {});
  },
};

export default racingManager;
