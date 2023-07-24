import { MESSAGE } from '../constants';

export class View {
  #inputView;
  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  readCarName(callback) {
    this.#inputView.readCarName(MESSAGE.READ.CAR_NAME, (userInput) => {
      callback(userInput);
    });
  }

  printError(error) {
    this.#outputView.printError(error);
  }
}
