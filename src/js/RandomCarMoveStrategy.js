import CarMoveStrategy from './CarMoveStrategy.js';

class RandomCarMoveStrategy extends CarMoveStrategy {
  static #GO_OR_STOP_CONDITION = 3;

  static #GENERATION_MIN = 0;

  static #GENERATION_MAX = 9;

  isMoveable() {
    const randomSize =
      RandomCarMoveStrategy.#GENERATION_MAX - RandomCarMoveStrategy.#GENERATION_MIN + 1;
    const randomNumber =
      Math.floor(Math.random() * randomSize) + RandomCarMoveStrategy.#GENERATION_MIN;

    return randomNumber > RandomCarMoveStrategy.#GO_OR_STOP_CONDITION;
  }
}

const randomCarMoveStrategy = new RandomCarMoveStrategy();
Object.freeze(randomCarMoveStrategy);
export default randomCarMoveStrategy;
