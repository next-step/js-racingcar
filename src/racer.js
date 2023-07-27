import { getRandomNumber, print } from './utils/common.util.js';

class Racer {
  #MOVE_THRESHOLD = 4;

  goForward(racer) {
    const isGo = this.checkGo(getRandomNumber(0, 9));
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
