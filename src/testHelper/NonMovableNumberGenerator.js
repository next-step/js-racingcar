import { NumberGenerator } from "../domain/strategy/NumberGenerator.js";

export class NonMovableNumberGenerator extends NumberGenerator {
  static NON_MOVABLE_NUMBER = 1;

  generate() {
    return NonMovableNumberGenerator.NON_MOVABLE_NUMBER;
  }
}
