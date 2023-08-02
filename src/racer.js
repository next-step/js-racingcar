import {
  MAX_RANDOM_NUMBER,
  MIN_RANDOM_NUMBER,
} from './constants/race.const.js';
import { getRandomNumber, print } from './utils/common.util.js';

class Racer {
  #MOVE_THRESHOLD = 4;

  goForward(racer) {
    const isGo = this.checkGo(
      getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER)
    );
    if (isGo) {
      racer.state += '-';
    }
  }

  printRacingState(name, state) {
    print(`${name} : ${state}`);
  }

  checkGo(randomNumber) {
    return randomNumber >= this.#MOVE_THRESHOLD;
  }
}

export default Racer;
