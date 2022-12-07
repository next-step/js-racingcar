class RacingGameModel {
  #cars = [];
  #racingCount = 1;

  constructor() {}

  getCars() {
    return this.#cars;
  }
  setCars(cars) {
    this.#cars.push(cars);
  }

  getRacingCount() {
    return this.#racingCount;
  }

  setRacingCount(count) {
    this.#racingCount = count;
  }
}

export default new RacingGameModel();
