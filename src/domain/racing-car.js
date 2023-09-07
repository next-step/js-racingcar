import { REGEX_PUNCTUAL_CHARACTERS } from '../constants/regex.const.js';
import UserIO from '../view/user-io.js';
import Racer from './racer.js';

const racer = new Racer();
const userIO = new UserIO();

class RacingCar {
  #CAR_NAME_LENGTH_LIMIT = 5;

  count;
  racers;
  winnerNames;

  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.racers = [];
    this.winnerNames = [];
  }

  validateCarNamesInput(names) {
    const isBlank = names.length === 0;

    if (isBlank) {
      return false;
    }

    const cars = names.split(',');

    const isOverMaxLength = cars.some(
      (name) => name.length > this.#CAR_NAME_LENGTH_LIMIT
    );

    if (isOverMaxLength) {
      return false;
    }

    const isDuplicated = new Set(cars).size !== cars.length;

    if (isDuplicated) {
      return false;
    }

    const isIncludedPunctualCharacters = cars.some((name) =>
      name.match(REGEX_PUNCTUAL_CHARACTERS)
    );

    if (isIncludedPunctualCharacters) {
      return false;
    }

    return true;
  }

  validateCountInput(count) {
    const isNumber = !Number.isNaN(parseInt(count));

    return isNumber;
  }

  race(racers, hasOutput) {
    for (let i = 0; i < this.count; i += 1) {
      racers.forEach((r) => {
        racer.goForward(r);
        hasOutput && userIO.outputRacingState(r.name, r.state);
      });
      hasOutput && userIO.outputEmpty();
    }

    this.setWinnerNames(racers);
  }

  setCount(count) {
    this.count = count;
  }

  setRacers(names) {
    names.split(',').forEach((name) => {
      this.racers.push({
        name,
        state: '',
      });
    });
  }

  setWinnerNames(racers) {
    const maxGos = Math.max(...racers.map((racer) => racer.state.length));
    racers.forEach((racer) => {
      if (racer.state.length === maxGos) {
        this.winnerNames.push(racer.name);
      }
    });
  }

  getRacers() {
    return this.racers;
  }

  getWinnerNames() {
    return this.winnerNames.join(', ');
  }
}

export default RacingCar;
