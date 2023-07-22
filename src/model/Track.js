const { DEFAULT_RACING_ROUND } = require('../constants/racing-rule.js');

class Track {
  #endRound;

  #round;

  constructor() {
    this.#endRound = DEFAULT_RACING_ROUND;
    this.#round = 1;
  }

  get round() {
    return this.#round;
  }

  increaseRound() {
    this.#round += 1;
  }

  isEndRound() {
    if (this.#round === this.#endRound + 1) return true;
    return false;
  }
}

module.exports = Track;
