import { MoveStrategy } from "./move-strategy.js";

export class CarMoveStrategy extends MoveStrategy {
  static #THRESHHOLD = 4;

  shouldMove(number) {
    return CarMoveStrategy.#THRESHHOLD <= number;
  }
}
