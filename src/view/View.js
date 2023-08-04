import { InputView, OutputView } from './index.js';

export class View {
  #inputView;

  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async inputByUser(message) {
    const userInput = await this.#inputView.input(message);
    return userInput;
  }

  print(message) {
    this.#outputView.print(message);
  }
}
