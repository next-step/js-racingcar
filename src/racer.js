import { getRaceRandomNumber } from './utils/race.util.js';
import { print } from './utils/common.util.js';

class Racer {
  #CHECK_RANDOM_NUMBER_MIN_VALUE = 4;

  racers;

  constructor() {
    this.init();
  }

  init() {
    this.racers = [];
  }

  setRacers(names) {
    names.split(',').forEach((name) => {
      this.racers.push({
        name,
        state: '',
      });
    });
  }

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
    return randomNumber >= this.#CHECK_RANDOM_NUMBER_MIN_VALUE;
  }
}

export default Racer;
