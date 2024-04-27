const INITIAL_ROUND = 0;
const RACING_ROUND = 5;

export class Racing {
  #round;

  constructor() {
    this.#round = INITIAL_ROUND;
  }

  start() {
    while (this.#round < RACING_ROUND) {
      this.#round++;
    }
  }

  get round() {
    return this.#round;
  }
}
