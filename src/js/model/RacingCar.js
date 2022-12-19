import { getOneRandomNumber } from "../utils/random.js";
import { RACING_CAR } from "../constants.js";

export default class RacingCar {
  constructor(name) {
    this.name = name;
  }

  move = (function () {
    let counter = 0;

    return {
      increase() {
        const a = getOneRandomNumber(
          RACING_CAR.MIN_RANDOM,
          RACING_CAR.MAX_RANDOM
        );
        if (a >= RACING_CAR.MOVE_CONDITION_NUMBER) {
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
