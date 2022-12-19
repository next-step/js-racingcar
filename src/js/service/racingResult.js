import car from '../model/Car.js';
import racingRule from './racingRule.js';

const GENERATION_MIN = 0;
const GENERATION_MAX = 9;

const racingResult = {
  getGameResult() {
    return new Array(car.trialCount).fill(false).map(_ => {
      const randomNumber = racingRule.goConditions('getRandomNumber', {
        GENERATION_MIN,
        GENERATION_MAX,
      });
      return racingRule.goConditions('isGoOrStop', randomNumber);
    });
  },

  getMaxWinnerCount() {
    return Math.max(
      ...Object.entries(car.gameResult).map(([_, value]) => value.filter(Boolean).length),
    );
  },

  getWinner() {
    const maxValue = this.getMaxWinnerCount();

    return Object.entries(car.gameResult).reduce((acc, [key, value]) => {
      if (value.filter(Boolean).length === maxValue) return [...acc, key];
      return acc;
    }, []);
  },
};

export default racingResult;
