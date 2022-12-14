import { getRandomNumber } from '../utils/random.js';

const GO_OR_STOP_CONDITION = 3;

const racingRule = {
  gameStrategy: {
    getRandomNumber,
    isGoOrStop: randomNum => randomNum > GO_OR_STOP_CONDITION,
  },

  goConditions(condition, param = null) {
    return this.gameStrategy[condition](param);
  },
};

export default racingRule;
