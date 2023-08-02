import {
  ERROR_EXIT_MESSAGE,
  ERROR_WRONG_INPUT_MESSAGE,
} from './constants/error.const.js';
import {
  PRINT_RESULT,
  QUESTION_CAR_NAMES,
  QUESTION_COUNT,
} from './constants/race.const.js';
import Racer from './racer.js';
import { print } from './utils/common.util.js';
import { readline } from './utils/readline.util.js';

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

  start() {
    readline.question(QUESTION_CAR_NAMES, (names) => {
      if (!this.validateCarNamesInput(names)) {
        this.printWrongInput();
        return this.start();
      }

      readline.question(QUESTION_COUNT, (count) => {
        if (!this.validateCountInput(count)) {
          this.printWrongInput();
          return this.start();
        }

        this.setCount(count);

        this.printTitle();

        this.setRacers(names);

        this.race(this.racers);
        this.printWinners();

        readline.close();
      });
    });
  }

  validateCarNamesInput(names) {
    const isCarNameMinLengthValidated = names.length > 0;

    if (!isCarNameMinLengthValidated) {
      return false;
    }

    const isCarNameMaxLengthValidated = names
      .split(',')
      .every(
        (name) => name.length > 0 && name.length <= this.#CAR_NAME_LENGTH_LIMIT
      );

    if (!isCarNameMaxLengthValidated) {
      return false;
    }

    const isCarNameNotDuplicatedValidated =
      new Set(names.split(',')).size === names.split(',').length;

    if (!isCarNameNotDuplicatedValidated) {
      return false;
    }

    const isCarNameNotIncludePunctualCharactersValidated = names
      .split(',')
      .every((name) => !name.match(/[{}[]\/?.,;:|)*~`!^-_+<>@#$%&\\=\('"]/));

    if (!isCarNameNotIncludePunctualCharactersValidated) {
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

  printTitle() {
    print('');
    print(PRINT_RESULT);
  }

  printWinners() {
    print(`${this.winners.join(', ')}가 최종 우승했습니다.`);
  }

  printWrongInput() {
    print('');
    print(ERROR_WRONG_INPUT_MESSAGE);
    print('');
  }

  exit() {
    throw new Error(ERROR_EXIT_MESSAGE);
  }
}

export default RacingCar;
