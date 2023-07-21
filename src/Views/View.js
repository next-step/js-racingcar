import { InputView, outputView } from './InputView';

export class View {
  #input;
  #output;

  /**
   *
   * @param {InputView} inputView
   * @param {outputView} outputView
   */
  constructor(inputView, outputView) {
    this.#input = inputView;
    this.#output = outputView;
  }
}
