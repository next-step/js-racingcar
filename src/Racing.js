import Car from "./Car.js";
import Validator from "./Validator.js";
import { TOTAL_RACING_COUNT } from "./constants.js";

class Racing {
  #cars;

  constructor(carNamesStr) {
    const carNames = carNamesStr.split(",").map((name) => name.trim());
    Validator.validateDuplicateCarName(carNames);
    this.#cars = carNames.map((name) => new Car(name));
  }

  start() {
    for (let i = 0; i < TOTAL_RACING_COUNT; i++) {
      for (let car of this.#cars) {
        car.move();
        car.printTrack();
      }
      console.log();
    }
  }

  getCars() {
    return [...this.#cars];
  }
}

export default Racing;
