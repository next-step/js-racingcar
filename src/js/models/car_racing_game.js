class CarRacingGame {
  #carNames;
  #totalCount;
  #result;
  #winners;

  constructor() {
    this.#carNames = [];
    this.#totalCount = 0;
    this.#result = [];
    this.#winners = [];
  }

  setCarNames(nextCarNames) {
    this.#carNames = nextCarNames;
  }

  setTotalCount(nextTotalCount) {
    this.#totalCount = nextTotalCount;
  }

  get carNames() {
    return this.#carNames;
  }

  get totalCount() {
    return this.#totalCount;
  }

  get result() {
    return this.#result;
  }

  get winner() {
    return this.#winners;
  }
}
