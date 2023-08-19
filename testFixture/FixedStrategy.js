import MoveStrategy from "../src/Models/MoveStrategy";
import { FixedNumberIsNotNumberError } from "./errors";

export default class FixedStrategy extends MoveStrategy {
  #number;

  constructor(number) {
    super();

    this.#validateNumber(number);

    this.#number = number;
  }

  #validateNumber(number) {
    if (typeof number !== "number") throw new FixedNumberIsNotNumberError();
  }

  generateNumber() {
    return this.#number;
  }

  isMovable() {
    const movableFunction = this.getMovableCondition();
    return movableFunction(this.generateNumber());
  }
}
