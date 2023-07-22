import { InputView, OutputView } from './InputView';

export class View {
  #inputView;
  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  readCarNames(callback) {
    this.#inputView.readCarNames(callback);
  }
}
