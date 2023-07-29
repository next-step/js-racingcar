import { MESSAGE } from '../constants';

export class View {
  #inputView;
  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
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
