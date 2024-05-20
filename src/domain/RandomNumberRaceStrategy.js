import RaceStrategy from "../common/RaceStrategy.js";
import { generateRandomNumber } from "../utils/generatorNumber.js";

const RULE = {
  MOVE_VALUE: 4,
  MIN_VALUE: 0,
  MAX_VALUE: 9,
};

class RandomNumberRaceStrategy extends RaceStrategy {
  move() {
    const random = generateRandomNumber(RULE.MIN_VALUE, RULE.MAX_VALUE);
    return random >= RULE.MOVE_VALUE;
  }
}

export default RandomNumberRaceStrategy;
