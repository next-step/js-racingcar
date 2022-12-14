class Car {
  #names;

  #trialCount;

  #gameResult;

  #winners;

  constructor() {
    this.#names = [];
    this.#trialCount = 0;
    this.#gameResult = [];
    this.#winners = [];
  }

  get names() {
    return this.#names;
  }

  set names(name) {
    this.#names = name;
  }

  get trialCount() {
    return this.#trialCount;
  }

  set trialCount(name) {
    this.#trialCount = name;
  }

  get gameResult() {
    return this.#gameResult;
  }

  set gameResult(name) {
    this.#gameResult = name;
  }

  get winners() {
    return this.#winners;
  }

  set winners(name) {
    this.#winners = name;
  }
}

const car = new Car();

export default car;
