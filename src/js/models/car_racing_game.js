import Observer from '../observer.js';

class CarRacingGame extends Observer {
  #carNames;
  #carRaceCount;
  #result;
  #winners;

  constructor() {
    super();
    this.#carNames = [];
    this.#carRaceCount = 0;
    this.#result = [];
    this.#winners = [];
  }

  setCarNames = (nextCarNames) => {
    this.#carNames = nextCarNames;
    this.notify();
  };

  setCarRaceCount = (nextTotalCount) => {
    this.#carRaceCount = nextTotalCount;
    this.notify();
  };

  get carNames() {
    return this.#carNames;
  }

  get carRaceCount() {
    return this.#carRaceCount;
  }

  get result() {
    return this.#result;
  }

  get winner() {
    return this.#winners;
  }
}

export default CarRacingGame;
