const { DEFAULT_RACING_ROUND } = require('../constants.js');

class Track {
  #endRound;

  #round;

  constructor() {
    this.#endRound = DEFAULT_RACING_ROUND;
    this.#round = 1;
  }

  increaseRound() {}

  isEndRound() {}
}

module.exports = Track;
