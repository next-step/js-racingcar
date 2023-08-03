import { MESSAGE } from '../constants';
import { Validation } from '../utils';
import { InputView, OutputView } from './';

export class View {
  #inputView = InputView;
  #outputView = OutputView;
  #validator = Validation.validateInput;

  constructor() {}

  #readInput(message, inputHandler) {
    this.#inputView.readUserInput(message, (userInput) => {
      this.#validator(userInput);

      inputHandler(userInput);
    });
  }

  readCarName(inputHandler) {
    this.#readInput(MESSAGE.READ.CAR_NAME, inputHandler);
  }

  readTotalRound(inputHandler) {
    this.#inputView.readUserInput(MESSAGE.READ.TOTAL_ROUND, inputHandler);
  }

  printGameResult(gameResult) {
    this.#outputView.print(gameResult);
    this.#closeReadLine();
  }

  printError(error) {
    this.#outputView.print(error);
  }

  #closeReadLine() {
    this.#inputView.close();
  }
}
