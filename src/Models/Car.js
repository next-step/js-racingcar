import { RACING_GAME } from '../constants';

export class Car {
  #name;
  #score;

  constructor(name) {
    this.#name = name;
    this.#score = 0;
  }

  advance() {
    this.#score += RACING_GAME.SCORE_UNIT;
  }

  getName() {
    return this.#name;
  }

  getScore() {
    return this.#score;
  }
}
