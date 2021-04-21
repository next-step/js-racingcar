import SETTINGS from '../settings.js';

const RacingCar = (({ rule, defaultVal }) => {
  const privt = new WeakMap();
  return class {
    constructor(entryName) {
      privt.set(this, { entryName, laps: defaultVal.laps });
    }

    static of(entryName) {
      return new RacingCar(entryName);
    }

    race(benchmark) {
      const self = privt.get(this);
      if (this.validateMoving(benchmark)) self.laps++;
    }

    validateMoving(benchmark) {
      return benchmark >= rule.movingBenchmark;
    }

    get name() {
      const {
        entryName: { name },
      } = privt.get(this);
      return name;
    }

    get laps() {
      const { laps } = privt.get(this);
      return laps;
    }

    get progress() {
      return [this.name, this.laps];
    }
  };
})(SETTINGS);

export default RacingCar;
