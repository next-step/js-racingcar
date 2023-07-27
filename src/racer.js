import { getRaceRandomNumber } from './utils/race.util.js';
import { print } from './utils/common.util.js';

class Racer {
  #MOVE_THRESHOLD = 4;

  goForward(racer) {
    const isGo = this.checkGo(getRaceRandomNumber());
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
