import { generateRandomNumber } from "../utils/generateRandomNumber.js";

export class Game {
  static RACING_CONFIG = {
    RANDOM_NUMBER_MIN: 0,
    RANDOM_NUMBER_MAX: 9,
    CAN_GO_FORWARD_NUMBER_MIN: 4,
    DURATION: 1_000,
  };

  racingCars;

  racingTimes;

  constructor({ racingCars, racingTimes }) {
    this.racingCars = racingCars;
    this.racingTimes = racingTimes;
  }

  play() {
    this.racingCars.forEach((racingCar) => {
      const canGoForward = this.#canGoForward();
      if (canGoForward) {
        racingCar.goForward();
      }
    });

    return this.getRacingRecords();
  }

  getRacingRecords() {
    return this.racingCars.map((racingCar) => {
      const { name, xPosition } = racingCar.record;

      return {
        name,
        xPosition,
      };
    });
  }

  getRacingWinnerNames() {
    const maxXPosition = Math.max(...this.racingCars.map((racingCar) => racingCar.record.xPosition));
    const winners = this.racingCars.filter((racingCar) => racingCar.record.xPosition === maxXPosition);

    return winners.map((winner) => winner.record.name).join(", ");
  }

  #canGoForward() {
    const number = generateRandomNumber(Game.RACING_CONFIG.RANDOM_NUMBER_MIN, Game.RACING_CONFIG.RANDOM_NUMBER_MAX);

    if (number >= Game.RACING_CONFIG.CAN_GO_FORWARD_NUMBER_MIN) {
      return true;
    }

    return false;
  }
}
