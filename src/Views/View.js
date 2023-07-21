import { InputView, outputView } from './InputView';

export class View {
  #input;
  #output;

  constructor(inputView, outputView) {
    this.#input = inputView;
    this.#output = outputView;
  }
}
