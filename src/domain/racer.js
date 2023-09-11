import { getRandomNumber } from '../utils/common.util.js';

class Racer {
  name;
  state;

  #MIN_RANDOM_NUMBER = 0;
  #MAX_RANDOM_NUMBER = 9;
  #MOVE_THRESHOLD = 4;

  constructor(name) {
    this.name = name;
    this.state = '';
  }

  goForward() {
    const isGo = this.checkGo(
      getRandomNumber(this.#MIN_RANDOM_NUMBER, this.#MAX_RANDOM_NUMBER)
    );
    if (isGo) {
      this.state += '-';
    }
  }

  checkGo(randomNumber) {
    return randomNumber >= this.#MOVE_THRESHOLD;
  }
}

export default Racer;
