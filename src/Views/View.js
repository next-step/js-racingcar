import { MESSAGE } from '../constants';
import { Validation } from '../utils';
import { InputView, OutputView } from './';

export class View {
  #inputView = InputView;
  #outputView = OutputView;
  #validator = Validation.validateInput;

  constructor() {}

  async #readInput(message) {
    const userInput = await this.#inputView.readUserInput(message);
    this.#validator(userInput);

    return userInput;
  }

  async readCarName(inputHandler) {
    return await this.#readInput(MESSAGE.READ.CAR_NAME);
  }

  async readTotalRound(inputHandler) {
    return await this.#inputView.readUserInput(MESSAGE.READ.TOTAL_ROUND);
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
