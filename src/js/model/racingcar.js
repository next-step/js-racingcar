import { getRandomNumber } from '../service/racingcar.js';
import {
  TRIM_BETWEEN_COMMA,
  GENERATION_MIN,
  GENERATION_MAX,
  GO_OR_STOP_CONDITION,
  SEPARATOR,
} from '../constant/racingcar.js';

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

  generateGame() {
    return this.names.reduce((acc, name) => ({ ...acc, [name]: this.getGameResult() }), {});
  },
};

export default racingManager;
