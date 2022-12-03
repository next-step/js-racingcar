import Observer from '../observer.js';

class CarRacingGame extends Observer {
  #carNames;
  #carRaceCount;
  #winners;

  constructor() {
    super();
    this.#carNames = [];
    this.#carRaceCount = 0;
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

  get winner() {
    return this.#winners;
  }
}

export default CarRacingGame;
