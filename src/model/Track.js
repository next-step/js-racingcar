const { DEFAULT_RACING_ROUND } = require('../constants/racing-rule.js');

class Track {
  #endRound = DEFAULT_RACING_ROUND;

  #round = 1;

  get round() {
    return this.#round;
  }

  increaseRound() {
    this.#round += 1;
  }

  isEndRound() {
    return this.#round > this.#endRound;
  }

  reset() {
    this.#round = 1;
    this.#endRound = DEFAULT_RACING_ROUND;
  }
}

module.exports = Track;
