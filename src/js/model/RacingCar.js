import { getOneRandomNumber } from "../utils/random.js";

export default class RacingCar {
  constructor(name) {
    this.name = name;
  }

  move = (function () {
    let counter = 0;

    return {
      increase() {
        const a = getOneRandomNumber(0, 9);
        if (a >= 4) {
          ++counter;
          return 1;
        }
        return -1;
      },
      getValue() {
        return counter;
      },
    };
  })();

  run = async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, 2000);
    });
    return this.move.increase();
  };
}
