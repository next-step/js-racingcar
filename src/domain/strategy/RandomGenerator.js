import { NumberGenerator } from "./NumberGenerator.js";

export class RandomGenerator extends NumberGenerator {
  static MOVE_MAX = 10;

  generate() {
    return Math.floor(Math.random() * RandomGenerator.MOVE_MAX);
  }
}
