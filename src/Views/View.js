import { MESSAGE } from '../constants';
import { InputView, OutputView, View } from './Views';

export class View {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  readCarName(inputHandler) {
    this.#inputView.readUserInput(MESSAGE.READ.CAR_NAME, (userInput) => {
      inputHandler(userInput);
    });
  }

  readTotalRound(inputHandler) {
    this.#inputView.readUserInput(MESSAGE.READ.TOTAL_ROUND, (userInput) => {
      inputHandler(userInput);
    });
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
