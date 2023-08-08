const validator = require('../../validator.js');

class Track {
  #endRound;

  #round = 1;

  constructor(round) {
    validator.checkValidRound(round);
    this.#endRound = round;
  }

  get round() {
    return this.#round;
  }

  get endRound() {
    return this.#endRound;
  }

  increaseRound() {
    this.#round += 1;
  }

  isEndRound() {
    return this.#round > this.#endRound;
  }

  reset() {
    this.#round = 1;
  }
}

module.exports = Track;
