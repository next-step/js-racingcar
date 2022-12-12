class RacingGameModel {
  #cars = [];
  #racingCount = 1;

  constructor() {}

  getCars() {
    return this.#cars;
  }
  setCars(car) {
    this.#cars.push(car);
  }

  getRacingCount() {
    return this.#racingCount;
  }

  setRacingCount(count) {
    this.#racingCount = count;
  }
}

export default RacingGameModel;
