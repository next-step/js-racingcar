import { InputView, OutputView } from './InputView';

export class View {
  #input;
  #output;

  constructor(inputView, outputView) {
    this.#input = InputView;
    this.#output = OutputView;
  }
}
