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

  get tryCount() {
    return this.#data.tryCount;
  }

  get carInfo() {
    return this.#data.cars;
  }

  get winner() {
    return this.#data.winner;
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

  setMoveCount(movedCarNames) {
    this.#data = {
      ...this.#data,
      cars: [...this.#data.cars].map((carInfo) => {
        const { carName, count } = carInfo;
        if (movedCarNames.includes(carName)) {
          return {
            ...carInfo,
            count: count + 1
          };
        }
        return {
          ...carInfo
        };
      })
    };
  }

  setWinner(winnerCount) {
    this.#data = {
      ...this.#data,
      winner: this.carInfo
        .filter(({ count }) => count === winnerCount)
        .map(({ carName }) => carName)
        .join(', ')
    };
  }

  resetGame() {
    this.#data = { ...INITIAL_DATA };
  }
}
