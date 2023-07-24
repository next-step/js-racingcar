import { RACING_GAME } from '../constants';

export class Car {
  #name;
  #score;

  constructor(name) {
    this.#name = name;
  }

  randomCarMovement() {
    const randomInt = getRandomIntInRange(
      UTIL.RANDOM_INT_MIN,
      UTIL.RANDOM_INT_MAX
    );

    if (randomInt >= RACING_GAME.MOVEMENT_THRESHOLD) this.advance();
  }

  advance() {
    this.score += RACING_GAME.SCORE_UNIT;
  }
}
