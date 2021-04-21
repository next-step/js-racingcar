import SETTINGS from '../settings.js';
import { err, random, max } from '../utils.js';

import RacingCar from './RacingCar.js';

const RacingGame = (({ rule, defaultVal, msg }) => {
  const privt = new WeakMap();
  return class {
    constructor(entryNames, totalRound) {
      privt.set(this, {
        racingCars: entryNames.map(RacingCar.of),
        totalRound,
        round: defaultVal.round,
      });
    }

    static of(entryNames, totalRound) {
      return new RacingGame(entryNames, totalRound);
    }

    race() {
      const self = privt.get(this);
      const { racingCars } = self;
      racingCars.forEach(rc =>
        rc.race(random(rule.minBenchmark, rule.maxBenchmark)),
      );
      self.round++;
    }

    get progress() {
      const { racingCars } = privt.get(this);
      return racingCars.map(rc => rc.progress);
    }

    get isFinished() {
      const { totalRound, round } = privt.get(this);
      return totalRound.checkFinish(round);
    }

    get winners() {
      if (!this.isFinished) err(msg.finishedYet);

      const { racingCars } = privt.get(this);
      const maxLaps = max(...racingCars.map(rc => rc.laps));
      return racingCars.filter(rc => rc.laps >= maxLaps).map(rc => rc.name);
    }
  };
})(SETTINGS);

export default RacingGame;
