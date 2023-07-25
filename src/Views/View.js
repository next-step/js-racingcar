import { MESSAGE } from '../constants';

export class View {
  #inputView;
  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  readCarName(validate) {
    this.#inputView.readCarName(MESSAGE.READ.CAR_NAME, (userInput) => {
      validate(userInput);
    });
  }

  printGameResult(gameResult) {
    this.#outputView.print(gameResult);
  }

  printError(error) {
    this.#outputView.print(error);
  }
}
