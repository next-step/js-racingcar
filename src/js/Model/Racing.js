import Validator from "./Validator.js";

import { WINNING_NUMBER } from "../util/consts.js";

class Racing {
  #cars

  constructor(cars) {
    this.#cars = cars
  }

  start() {
    return Array.from({length: this.#cars.length})
      .map(e => e = this.generateRandomNumber().next().value)
      .map(e => e >= WINNING_NUMBER )
  }

  *generateRandomNumber() {
    while (true) yield Math.floor(Math.random() * 10)
  }

  static get validate() {
    return {
      carNameLength(text) {
        return Validator.isEmpty(text) || Validator.isCorrectLength(text)
      },

      racingCount(text) {
        return Validator.isCorrectCount(text)
      }
    }
  }
}

export default Racing;

