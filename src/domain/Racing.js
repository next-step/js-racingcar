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
    let carHistories = [];
    while (this.#currRound < this.#maxRound) {
      this.#cars.forEach((car) => car.drive(generateRandomNumber()));
      this.#currRound++;
      carHistories.push(new Array(...this.#cars));
    }
    return carHistories;
  }

  get cars() {
    return this.#cars;
  }
}
