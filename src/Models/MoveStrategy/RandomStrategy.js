import MoveStrategy from ".";
import {
  MinMaxNumberIsNotNumberError,
  MinNumberGreaterThanMaxNumberError,
} from "./errors";

export default class RandomStrategy extends MoveStrategy {
  #min;
  #max;

  static MIN_NUMBER = 0;
  static MAX_NUMBER = 9;

  constructor(
    min = RandomStrategy.MIN_NUMBER,
    max = RandomStrategy.MAX_NUMBER
  ) {
    super();

    this.#validateMinMaxNumber(min, max);

    this.#min = min;
    this.#max = max;
  }

  #validateMinMaxNumber(min, max) {
    if (typeof min !== "number" || typeof max !== "number")
      throw new MinMaxNumberIsNotNumberError();
    if (min > max) throw new MinNumberGreaterThanMaxNumberError();
  }

  generateNumber() {
    return Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
  }

  isMovable() {
    const movableFunc = this.getMovableCondition();
    return movableFunc(this.generateNumber());
  }
}
