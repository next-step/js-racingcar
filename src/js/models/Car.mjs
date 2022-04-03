class Car {
  #name;
  #gameResult;

  constructor(name) {
    this.#name = name;
    this.#gameResult = [];
  }

  get name() {
    return this.#name;
  }

  get gameResult() {
    return this.#gameResult;
  }

  set gameResult(result) {
    this.#gameResult = result;
  }
}

export default Car;
