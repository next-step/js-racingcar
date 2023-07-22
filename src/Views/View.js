export class View {
  #inputView;
  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  readCarName(callback) {
    this.#inputView.readCarName(callback);
  }
}
