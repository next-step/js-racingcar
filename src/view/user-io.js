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

  outputTitle() {
    print('');
    print(PRINT_RESULT);
  }

  outputWinners(winners) {
    print(`${winners}가 최종 우승했습니다.`);
  }

  outputWrongInput() {
    print('');
    print(ERROR_WRONG_INPUT_MESSAGE);
    print('');
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
