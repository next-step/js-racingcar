import deepCopy from "../../utils/deepCopy.js";

class RacingRound {
  #cars;
  #movementRule;

  constructor(cars, movementRule) {
    this.#cars = cars;
    this.#movementRule = movementRule;
  }

  execute() {
    this.#cars.forEach((car) => {
      if (this.#movementRule()) {
        car.move();
      }
    });
  }

  toJSON() {
    const carsJSON = this.#cars.map((car) => car.toJSON());
    return deepCopy(carsJSON);
  }

  getWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));

    const winnersJSON = this.#cars
      .filter((car) => car.position === maxPosition)
      .map((car) => car.toJSON());

    return deepCopy(winnersJSON);
  }
}

export default RacingRound;
