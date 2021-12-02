const INITIAL_DATA = {
  cars: null,
  tryCount: 0,
  winner: null
};

export default class RacingcarModel {
  #data;

  constructor() {
    this.#data = { ...INITIAL_DATA };
  }

  get carNames() {
    return this.#data.cars.map(({ carName }) => carName);
  }

  setCars(data) {
    this.#data = {
      ...this.#data,
      cars: data.map((carName) => {
        return {
          carName,
          count: 0
        };
      })
    };
    return this.#data;
  }

  setTryCount(data) {
    this.#data = {
      ...this.#data,
      tryCount: data
    };
    return this.#data;
  }

  setWinner() {}

  resetGame() {
    this.#data = { ...INITIAL_DATA };
  }
}
