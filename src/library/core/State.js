export default class State {
  #value;

  constructor(initialValue) {
    this.#value = initialValue;
  }

  get = () => {
    return this.#value;
  };

  set = newValue => {
    this.#value = newValue;
  };
}
