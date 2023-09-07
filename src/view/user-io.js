import {
  ERROR_EXIT_MESSAGE,
  ERROR_WRONG_INPUT_MESSAGE,
} from '../constants/error.const.js';
import {
  PRINT_RESULT,
  QUESTION_CAR_NAMES,
  QUESTION_COUNT,
} from '../constants/race.const.js';
import { print } from '../utils/common.util.js';

class UserIO {
  #readline = null;

  constructor(readline) {
    this.#readline = readline;
  }

  inputCarNames() {
    return new Promise((resolve) => {
      this.#readline.question(QUESTION_CAR_NAMES, (carNames) =>
        resolve(carNames)
      );
    });
  }

  inputCount() {
    return new Promise((resolve) => {
      this.#readline.question(QUESTION_COUNT, (count) => resolve(count));
    });
  }

  outputEmpty() {
    print('');
  }

  outputTitle() {
    this.outputEmpty();
    print(PRINT_RESULT);
  }

  outputRacingStates(racers, count) {
    for (let i = 0; i < count; i += 1) {
      racers.forEach(({ name, state }) => {
        this.outputRacingState(name, state);
      });
      this.outputEmpty();
    }
  }

  outputRacingState(name, state) {
    print(`${name} : ${state}`);
  }

  outputWinnerNames(winnerNames) {
    print(`${winnerNames}가 최종 우승했습니다.`);
  }

  outputWrongInput() {
    this.outputEmpty();
    print(ERROR_WRONG_INPUT_MESSAGE);
    this.outputEmpty();
  }

  outputErrorMessage(errorMsg) {
    print(errorMsg);
  }

  close() {
    this.#readline.close();
  }

  exit() {
    throw new Error(ERROR_EXIT_MESSAGE);
  }
}

export default UserIO;
