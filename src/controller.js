import Race from "./domain/Race.js";
import { displayWinners, displayRaceRecords } from "./view.js";
import { CAR, RACE, ERROR_MESSAGE } from "./constant/index.js";

export default class Controller {
  #race;

  constructor() {
    this.#race = new Race();
  }

  async initCarNames(askCarNames, nextStep) {
    try {
      const carNames = await askCarNames();

      if (carNames === "") {
        throw new Error(ERROR_MESSAGE.CAR_NAME_REQUIRED);
      }

      this.#race.cars = carNames.split(CAR.NAME_SEPARATOR);

      if (nextStep) {
        await nextStep();
      }
    } catch (error) {
      console.error(error.message);
      this.initCarNames(askCarNames, nextStep);
    }
  }

  async initMaxRound(askMaxRound, nextStep) {
    try {
      const input = await askMaxRound();
      const maxRound = Number(input);

      if (input === "") {
        throw new Error(ERROR_MESSAGE.RACE_ROUND_REQUIRED);
      }

      if (isNaN(maxRound)) {
        throw new Error(ERROR_MESSAGE.RACE_ROUND_NUMBER);
      }

      if (Math.floor(maxRound) !== maxRound) {
        throw new Error(ERROR_MESSAGE.RACE_ROUND_NATURAL_NUMBER);
      }

      if (maxRound < RACE.MIN_ROUND) {
        throw new Error(ERROR_MESSAGE.RACE_ROUND_MORE_THAN_ZERO);
      }

      this.#race.maxRound = maxRound;

      if (nextStep) {
        await nextStep();
      }
    } catch (error) {
      console.error(error.message);
      return this.initMaxRound(askMaxRound, nextStep);
    }
  }

  get race() {
    return this.#race;
  }

  playRaceGame() {
    for (let i = 0; i < this.#race.maxRound; i++) {
      this.#race.playRound();
      displayRaceRecords(this.#race.currentRoundRecord);
    }
  }

  finish() {
    displayWinners(this.#race.winners);
  }
}
