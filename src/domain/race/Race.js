import { Car } from "../car/Car.js";
import { RandomGenerator } from "../strategy/RandomGenerator.js";
import { View } from "../../View.js";

export class Race {
  #cars;
  #winners;
  #generator = new RandomGenerator();
  static #ROUND = 5;

  constructor(carNames) {
    const carNameList = this.splitCarNames(carNames);
    this.#cars = carNameList.map((name) => new Car(name));
  }

  race() {
    for (let round = 1; round <= Race.#ROUND; round++) {
      this.#racing();
      this.#recordRace(round);
    }
  }

  #racing() {
    this.#cars.forEach((car) => {
      car.move(this.#generator);
    });
  }

  #recordRace(count) {
    View.printRound(count);
    for (let i = 0; i < this.#cars.length; i++) {
      const record = this.#cars[i].getPosition();
      View.printRecord(this.#cars[i], record);
    }
  }

  findLeadingCars() {
    if (this.#cars.length === 0) {
      return [];
    }

    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));

    const winnerNames = this.#cars
      .filter((car) => car.getPosition() === maxPosition)
      .map((car) => car.getName());

    return winnerNames;
  }

  getNumberOfCars() {
    return this.#cars.length;
  }

  getWinners() {
    return this.#winners;
  }

  splitCarNames(carNames) {
    return carNames.split(",").map((name) => name.trim());
  }
}
