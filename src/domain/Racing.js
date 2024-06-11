import { generateRandomNumber } from "../util/random.js";

export class Racing {
  #cars = [];
  #currRound = 0;
  #maxRound;

  constructor(cars, roundCount) {
    this.#cars = cars;
    this.#maxRound = roundCount;
  }

  gameStart() {
    const carHistories = [];
    while (this.#currRound < this.#maxRound) {
      this.#cars.forEach((car) => car.drive(generateRandomNumber(0, 9)));

      const newCars = this.#cars.map((car) => Object.assign({}, car));
      carHistories.push([...newCars]);

      this.#currRound++;
    }
    return carHistories;
  }

  get cars() {
    return this.#cars;
  }
}
