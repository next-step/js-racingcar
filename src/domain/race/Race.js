import { Car } from "../car/Car";

export class Race {
  #cars;
  static #ROUND = 5;

  constructor(carNames) {
    const carNameList = this.splitCarNames(carNames);
    this.#cars = carNameList.map((name) => new Car(name));
  }

  getNumberOfCars() {
    return this.#cars.length;
  }

  splitCarNames(carNames) {
    return carNames.split(",").map((name) => name.trim());
  }
}
