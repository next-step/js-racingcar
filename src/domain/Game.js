import { generateRandomNumber } from "../utils/generateRandomNumber.js";
import { View } from "../view/View.js";

export class Game {
  #RACING_CONFIG = {
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

  play({ onAfterEachRound }) {
    return new Promise((resolve) => {
      for (let i = 0; i < this.racingTimes; i += 1) {
        let racingStatusText = "";

        this.racingCars.forEach((racingCar) => {
          const canGoForward = this.#canGoForward();
          if (canGoForward) {
            racingCar.goForward();
          }

          racingStatusText += `${this.#getRacingStatusText(racingCar.record)}\n`;
        });

        setTimeout(() => {
          onAfterEachRound(racingStatusText);

          const isRacingEnd = i === this.racingTimes - 1;
          if (isRacingEnd) {
            const winnerNames = this.#getRacingWinnerNames(this.racingCars);
            resolve(winnerNames);
          }
        }, i * this.#RACING_CONFIG.DURATION);
      }
    });
  }

  #getRacingWinnerNames(racingCars) {
    const maxXPosition = Math.max(...racingCars.map((racingCar) => racingCar.record.xPosition));
    const winners = racingCars.filter((racingCar) => racingCar.record.xPosition === maxXPosition);

    return winners.map((winner) => winner.record.name).join(", ");
  }

  #canGoForward() {
    const number = generateRandomNumber(this.#RACING_CONFIG.RANDOM_NUMBER_MIN, this.#RACING_CONFIG.RANDOM_NUMBER_MAX);

    if (number >= this.#RACING_CONFIG.CAN_GO_FORWARD_NUMBER_MIN) {
      return true;
    }

    return false;
  }

  #getRacingStatusText(racingCarRecord) {
    const { name, xPosition } = racingCarRecord;
    return `${name} : ${"-".repeat(xPosition)}`;
  }
}
