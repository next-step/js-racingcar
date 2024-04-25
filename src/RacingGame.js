class RacingGame {
  #round;

  constructor() {
    this.#round = 0;
  }

  get round() {
    return this.#round;
  }

  start() {
    while (this.#round < 5) {
      // ...
      this.#round += 1;
    }
  }
}

export default RacingGame;
