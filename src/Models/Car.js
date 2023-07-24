import { RACING_GAME } from '../constants';

export class Car {
  #name;
  #score;

  constructor(name) {
    this.#name = name;
  }

  advance() {
    this.#score += RACING_GAME.SCORE_UNIT;
  }
}
