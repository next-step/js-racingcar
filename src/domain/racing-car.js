import { REGEX_PUNCTUAL_CHARACTERS } from '../constants/regex.const.js';
import Racer from './racer.js';
import { print } from '../utils/common.util.js';

const racer = new Racer();

class RacingCar {
  #CAR_NAME_LENGTH_LIMIT = 5;

  count;
  racers;
  winners;

  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.racers = [];
    this.winners = [];
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
    const isValidated = !Number.isNaN(parseInt(count));

    return isValidated;
  }

  race(racers) {
    for (let i = 0; i < this.count; i += 1) {
      racers.forEach((r) => {
        racer.goForward(r);
        racer.printRacingState(r.name, r.state);
      });
      print('');
    }

    this.setWinners(racers);
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

  setWinners(racers) {
    const maxGos = Math.max(...racers.map((racer) => racer.state.length));
    racers.forEach((racer) => {
      if (racer.state.length === maxGos) {
        this.winners.push(racer.name);
      }
    });
  }

  getWinners() {
    return this.winners.join(', ');
  }
}

export default RacingCar;
