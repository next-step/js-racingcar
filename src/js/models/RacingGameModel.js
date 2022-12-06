class RacingGameModel {
  #cars = [];

  constructor() {}

  getCars() {
    return this.#cars;
  }
  setCars(cars) {
    this.#cars.push(cars);
  }
}

export default new RacingGameModel();
