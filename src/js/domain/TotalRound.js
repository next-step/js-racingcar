import SETTINGS from '../settings.js';
import { err } from '../utils.js';

const TotalRound = (({ rule, msg }) => {
  const privt = new WeakMap();
  return class {
    constructor(round) {
      this.validateRound(round);
      privt.set(this, { round });
    }

    validateRound(round) {
      if (round < rule.minTotalRound) err(msg.invalidRound);
    }

    static of(round) {
      return new TotalRound(round);
    }

    checkFinish(currentRound) {
      const { round } = privt.get(this);
      return round <= currentRound;
    }
  };
})(SETTINGS);

export default TotalRound;
