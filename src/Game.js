import { View } from "./view/View.js";

export class Game {
  #RACING_TIMES = 5;

  #RACING_DURATION = 1_000;

  constructor({ racingCars }) {
    this.racingCars = racingCars;
  }

  play() {
    return new Promise((resolve) => {
      for (let i = 0; i < this.#RACING_TIMES; i += 1) {
        let racingStatusText = "";

        this.racingCars.forEach((racingCar) => {
          racingCar.goForward();

          racingStatusText += `${this.#getRacingStatusText(racingCar.record)}\n`;
        });

        setTimeout(() => {
          View.log(racingStatusText);

          const isRacingEnd = i === this.#RACING_TIMES - 1;
          if (isRacingEnd) {
            resolve();
          }
        }, i * this.#RACING_DURATION);
      }
    });
  }

  #getRacingStatusText(racingCarRecord) {
    const { name, xPosition } = racingCarRecord;
    return `${name} : ${"-".repeat(xPosition)}`;
  }
}
